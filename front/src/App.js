import React, { Component } from 'react';
import './App.css';
import Match from './Match';

const axios = require('axios');

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {matches: []};
  }

  componentWillMount = async () => {
    const response = await axios.get('/matches');
    console.log(response);
    this.setState({matches: response.data});
  }

  render = () => {
    const matches = this.state.matches.map((m, index) => <Match key={index} data={m}/> )

    return (
      <div className="App">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Link</th>
              <th scope="col">Location</th>
              <th scope="col">odd1</th>
              <th scope="col">odd2</th>
              <th scope="col">delta</th>
              <th scope="col">player1</th>
              <th scope="col">player2</th>
              <th scope="col">sport</th>
            </tr>
          </thead>
          <tbody>
            {matches}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
