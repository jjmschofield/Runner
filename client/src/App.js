import React, { Component } from 'react';
import { Loader, Dimmer } from 'semantic-ui-react';
import logo from './logo.svg';
import './App.css';

const userId = 0;

export class App extends Component {
  constructor(props){
    super(props);

    if(!props.users.usersById[userId]){
      props.fetchUserById(userId);
    }

    if(!props.runs.runsByUserId[userId]){
      props.fetchRunsByUserId(userId);
    }
  }

  render() {
    const user = this.props.users.usersById[userId];
    const runs = this.props.runs.runsByUserId[userId];

    if(user && runs){
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
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
