# Runner

## Getting Started
### Pre-Reqs
* **Runtime:**  `node >= v8.93`
* **Package Manager:** `npm >= v5.6.0`
* **Optional:** `Jetbrains IDE (Webstorm / IntelliJ)`
* **Database Server:** `Postgres v10` 

### Running the client
```
$ cd client
$ npm install
$ npm start
```

### Running the Server
```
$ cd server
$ npm install
$ cp .env-example .env
$ npm start
```


Note, you will also need to setup your local database for development.


#### Setting Up a Local DB

* Create a new datbaase named `runner`
* Update `.env` with the username and password to use for migrations (`postgres` is ok for local development)
* To get the latest version of the database run: 
``` 
$ npm run database:migrate
```
* To add some useful data to the database run:
``` 
$ npm run database:seed
```

By default the project is setup to create 1000 users with a random number of runs between 0 and 100 each. You can tweak these values as you see fit to test the performance of your queries. Note that when creating a large data set it might take some time as faker.js creates all the random data for you. It is also entirely possible that you'll blow the stack as the seed isn't batched.

When creating your `.env` you will probably have noticed that each service has it's own username and password to access the DB. You can set up these users with permissions to the required stored procedures for each service (see `src/routes/<service name>/sql/STORED_PROCEDURES`) or set them all to the same. For production usage you should definately have a seperate user for each service with tightly scoped permissions.

## API Endpoints
### Users
```
GET: users/
returns {}

GET: users/:userId
returns {
    id: number,
    profile: {
        givenName: string,
        familyName: string,
        dob: date,
        avatarUrl: string
    }
    bios: {
        weight: number
    }
}

```

### Activities
```
GET: activities
NOT IMPLEMENTED

GET: activities/runs
returns {}

GET: activities/runs?userId=int
returns {
    runs: [
        {
          id: int,
          userId: int,
          distance: int,
          duration: int,
          date: date
        }
    ]
}

```



## Database Schema
### Users Schema
#### Users Table
Stores basic user data.
```
{
    id: int
}

```
#### UserProfile Table
Stores personally identifable information about a user.
```
{
    user_id: int
    given_name: varchar(50)
    family_name: varchar(50)
    avatar_url: varchar(100)
    dob: date 
}
```

#### UserBio Table
Stores biometric data about a user (losely termed).
```
{
    user_id: int
    weight_grams: int 
}
```

### Activities Schema

#### Runs Table
Stores basic user data.
```
{
    user_id: int
    date: date
    distance_meters: int
    duration_seconds: int
}

```

## Caloires Burned Calculation
The brief specifies this as:

```
VO2 ~= 2.209 + 3.1633 * kph
Kcal/Min ~= 4.86 * massKg * VO2 / 1000

```

This is a fairly simple calculation based around Legers solution for VO2, which does not take account of inclines.

The brief also specifies that this calculation might change soon.

There are two approaches to solving this:
 * Store calculations and update them in the future when the algo changes
 * Do not store calculations and generate them on request

The later has been employed here, to prevent storing data which we know is going to have be updated in bulk anyway. This kepes the solution flexible and adaptive in the short term.

The choices between were to do this calculation were:

 * API layer
 * Data layer

The data layer was picked to prevent the `user` and `activities` API's from needing to request one anothers data. A view is used to accomplish this along with a number of stored procedures to do the work. This has the following drawbacks:

 * Weight is not stored along with the run
    * The calculation will always be based on the users **current** weight and not their weight at the time of the run
    * A weight wehich fluctuates dramatically will produce noticable effects on the data
    * Weight could be stored along with the run - however this is duplication of data and is breaking the constraints of our compliant data store
 * At very large scale performance may become an issue
    * The choice at this point is either to turn this into a materialized view or to begin writing the values

## Warnings and Technical Debt
* **This solution provides no authorization or authentication**
  * This is a big one, do not put live users data into this system
  * Getting there should be easy, simply pick and IdP and implement OAuth (you will want to extend the users.users table to include the IdP's user ID so you can relate them)
  * Alternatively you could bycrpt passwords into the users.users table (but seriously, get some off the shelf OAuth so that you don't have to handle passwords)
  * Finally get the user to sign in via the IdPs STS, then start making use of the resultant JWT
  * For requests where a user is requesting access to get or update their own data, authorization can very easily be achieved by not requesting the ID as a part of the query or post and instead infering it directly from the JWT. Your private/public key signing of the JWT will protect you from fiddling.

## Design Decisions
* One repo
  * A single repository has both the client and server code
  * This helps to keep the product contained - at the expense of workflow and deployment flexibility
  * Do not make client code depend on server side modules - this unclear dependency could produce an attack vector
  * It should be tirvial to split the client into a seperate repo when required in the future
* Two Projects
  * Client and server applications are split into seperate projects
  * This helps to ensure that the two do not become dependent on one another
  * This also helps to ensure that the dependencies of each deployable entity are clear (it can be a challenge to work this out later)
* Monolithic Service
  * Due to the size of the project a single API and database is provided
  * This simplifies dependency managment and deployments at the cost of workflow and deployment flexibility
  * Care has been taken to seperate the API to independent routers to provide encapsulation - this should ease breaking the project apart later, as these routers apply their isolated middleware and have their own db connection pools
  * Contributors should not make dependencies between API routes or their children - if you have code which needs to be used by multiple routes it should be extracted to a module under `server/src/lib`
  * This practice keeps dependencies clear and will allow us to move common code into npm packages / git submodules later
* Seperated Schema
  * We seperate out the database using schemas, this keeps the database logically exncapsulated and allows it to be split in future if required
* Seperated User Data
  * User data is split across multiple tables, this helps to prevent data leakage and be more compliant
* The Service Layer Must Use Stored Procedures
  * The stored procedures in the database offer up an API of what can / can't be done 
  * This provides fine tuned permissions for what database users can and can't do
  * This protects against SQL injection attacks if they are not caught at the service layer
  * This means that the database offers up an API, so that the service layer doesn't have to worry / track implementation details
* Units of measurment
  * Time is recorded in seconds (ints)
  * Distance is recorded in meters (ints)
  * Weight is recorded in grams (ints)
  * Smaller units may be preferable, depending on the use case for the rest of the application
  * Ints are being prefered to maintain accuracy, though it shuold be fine to flip them to doubles/floats

