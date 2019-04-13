import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";

import SearchAddress from "../SearchAddress/SearchAddress";
import Payment from "../Payment/Payment";
import { isValidAddress, getBalance } from "../commons/BitcoinUtil";
import "./App.css";

class App extends Component {
  state = {
    account: "",
    disable: true,
    balance: 0,
    btcAccount: "",
    srcAdr: " ",
    destAdr: " ",
    quantity: " "
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  componentDidMount() {}

  getBtcBalance = async () => {
    //get the validated address from the state
    const addr = this.state.account;
    const response = await getBalance(addr);
    this.setState({ balance: response.balance });
  };

  //validate the input address and enable or disable the search button
  onChange = (event, data) => {
    isValidAddress(data.value)
      ? this.setState({ disable: false, account: data.value })
      : this.setState({ disable: true });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Main Header</h1>
          <SearchAddress
            onChange={this.onChange}
            disable={this.state.disable}
            balance={this.state.balance}
            getBtcBalance={this.getBtcBalance}
          />
          <Payment
            handleChange={this.handleChange}
            srcAdr={this.state.srcAdr}
            destAdr={this.state.destAdr}
            quantity={this.state.quantity}
          />
        </header>
      </div>
    );
  }
}

export default App;
