import React, { Component } from "react";
import { Input, Button } from "semantic-ui-react";
import validate from "bitcoin-address-validation";
import axios from "axios";

export default class SearchAddress extends Component {
  constructor() {
    super();

    this.texInput = React.createRef();
  }

  state = {
    account: this.texInput,
    disable: true,
    balance: 0
  };

  //validate the input address and enable or disable the search button
  onChange = (event, data) => {
    if (validate(data.value)) {
      const account = data.value;
      this.setState({ disable: false, account });
    } else {
      this.setState({ disable: true });
    }
  };

  getBtcBalance = async () => {
    //get the validated address from the state
    const addr = this.state.account;
    const url = `https://api.blockcypher.com/v1/btc/test3/addrs/${addr}/balance`;

    try {
      const response = await axios.get(url);
      this.setState({ balance: response.data.balance });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div>
        <Button
          content="Search"
          className="search-button"
          disabled={this.state.disable}
          onClick={this.getBtcBalance}
        />
        <Input
          ref={this.texInput}
          className="search-input"
          placeholder="Search..."
          onChange={this.onChange}
        />
      </div>
    );
  }
}
