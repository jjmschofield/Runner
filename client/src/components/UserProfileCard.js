import React, { Component } from 'react';
import { Loader, Dimmer, Card, Image, List } from 'semantic-ui-react';
import { differenceInYears } from 'date-fns';

export class UserProfileCard extends Component {
  getAge(dob){
    return differenceInYears(Date.now(), dob);
  }

  getWeightKg(weightGrams){
    return (weightGrams / 1000).toFixed(2);
  }

  render() {
    if (this.props.user) {
      return (
        <Card>
          <Image size="medium" src={this.props.user.profile.avatarUrl}/>
          <Card.Content>
            <Card.Header>
              {this.props.user.profile.givenName} {this.props.user.profile.familyName}
            </Card.Header>
            <Card.Description>
              <List>
                <List.Item>
                  <List.Header>
                    Age
                  </List.Header>
                  <List.Content>
                    {this.getAge(this.props.user.profile.dob)}
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Header>
                    Weight
                  </List.Header>
                  <List.Content>
                    {this.getWeightKg(this.props.user.bios.weight)}kg
                  </List.Content>
                </List.Item>
              </List>
            </Card.Description>
          </Card.Content>
        </Card>
      );
    }

    return (
      <Dimmer active inverted>
        <Loader size="massive">Loading</Loader>
      </Dimmer>
    )
  }
}

export default UserProfileCard;
