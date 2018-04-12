import React, { Component } from 'react';
import { Loader, Dimmer, Container, Card, Image, Divider, List, Table, Statistic, Label } from 'semantic-ui-react';
import { toStandardDateFormat } from './utils/dateUtils';
import { differenceInYears, getTime } from 'date-fns';
import './App.css';

const userId = Math.floor(Math.random() * Math.floor(999));

export class App extends Component {
  constructor(props) {
    super(props);

    if (!props.users.usersById[userId]) {
      props.fetchUserById(userId);
    }

    if (!props.runs.runsByUserId[userId]) {
      props.fetchRunsByUserId(userId);
    }
  }

  renderRuns(runs) {
    const orderedRuns = Array.from(runs);
    orderedRuns.sort((a,b)=>{
      return getTime(b.date) - getTime(a.date);
    });

    return orderedRuns.map((run) => {
      return (
        <Table.Row>
          <Table.Cell>
            <Label ribbon color='blue' size="large">{toStandardDateFormat(run.date)}</Label>
          </Table.Cell>
          <Table.Cell>
            <Statistic size="mini" horizontal>
              <Statistic.Value>{(run.distance / 1000).toFixed(2)}</Statistic.Value>
              <Statistic.Label>Kilometers</Statistic.Label>
            </Statistic>
          </Table.Cell>
          <Table.Cell>
            <Statistic size="mini" horizontal>
              <Statistic.Value>{(run.duration / 60).toFixed(2)}</Statistic.Value>
              <Statistic.Label>mins</Statistic.Label>
            </Statistic>
          </Table.Cell>
          <Table.Cell>
            <Statistic size="mini" horizontal>
              <Statistic.Value>{(run.kCalMin * (run.duration / 60)).toFixed(2)}</Statistic.Value>
              <Statistic.Label>kcal</Statistic.Label>
            </Statistic>
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    const user = this.props.users.usersById[userId];
    const runs = this.props.runs.runsByUserId[userId];

    if (user && runs) {
      return (
        <div className="App">
          <Divider hidden/>
          <Container>
            <Card>
              <Image size="medium" src={user.profile.avatarUrl}/>
              <Card.Content>
                <Card.Header>
                  {user.profile.givenName} {user.profile.familyName}
                </Card.Header>
                <Card.Description>
                  <List>
                    <List.Item>
                      <List.Header>
                        Age
                      </List.Header>
                      <List.Content>
                        {differenceInYears(Date.now(), user.profile.dob)}
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Header>
                        Weight
                      </List.Header>
                      <List.Content>
                        {user.bios.weight / 1000}kg
                      </List.Content>
                    </List.Item>
                  </List>
                </Card.Description>
              </Card.Content>
            </Card>
            <Table fluid striped>
              <Table.Body>
                {this.renderRuns(runs)}
              </Table.Body>
            </Table>
          </Container>
          <Divider hidden/>
        </div>
      );
    }

    return (
      <Dimmer active inverted>
        <Loader size="massive">Loading</Loader>
      </Dimmer>
    )
  }
}

export default App;
