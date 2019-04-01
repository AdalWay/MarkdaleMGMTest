import React, { Component } from "react";
import SearchAddress from "../SearchAddress/SearchAddress";

import "./App.css";

class App extends Component {
  state = {
    btcAccount: ""
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Main Header</h1>

          <SearchAddress />
        </header>
      </div>
    );
  }
}

export default App;
