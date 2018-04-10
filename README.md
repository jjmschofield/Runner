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
* Run 
``` 
$ npm run database:migrate
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
  * Care has been taken to seperate the API to independent routers to provide encapsulation - this should ease breaking the project apart later
  * Contributors should not make dependencies between API routes or their children - if you have code which needs to be used by multiple routes it should be extracted to a module under `server/src/common`
  * This practice keeps dependencies clear and will allow us to move common code into npm packages / git submodules later
* Seperated Schema
  * We seperate out the database using schemas, this keeps the database logically exncapsulated and allows it to be split in future if required
* Seperated User Data
  * User data is split across multiple tables, this helps to prevent data leakage and be more compliant

