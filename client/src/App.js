import React, { Component } from 'react';
import { Loader, Dimmer, Container, Divider } from 'semantic-ui-react';
import { PageHeader } from './components/PageHeader';
import { UserProfileCard } from './components/UserProfileCard';
import { RunsTable } from './components/RunsTable';
import { RunsAddModal } from './components/RunsAddModal';
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

    this.state = {
      modalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  }


  render() {
    const user = this.props.users.usersById[userId];
    const runs = this.props.runs.runsByUserId[userId];

    if (user && runs) {
      return (
        <div className="App">
          <PageHeader/>
          <Divider hidden/>
          <Container>
            <UserProfileCard user={user}/>
            <RunsTable runs={runs} addRunOnClick={this.toggleModal}/>
          </Container>
          <Divider hidden/>
          <RunsAddModal
            open={this.state.modalOpen}
            addRun={this.props.addRun}
            close={this.toggleModal}
            onClose={this.toggleModal}
            userId={userId}/>
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
