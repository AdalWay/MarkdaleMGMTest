import React, { Component } from "react";
import { Form } from "semantic-ui-react";
import { sendPayment } from "../commons/BitcoinUtil";

export default class Payment extends Component {
  state = {
    srcAdr: " ",
    destAdr: " ",
    quantity: " "
  };

  handleSubmit = e => {
    e.preventDefault();
    const { srcAdr, destAdr, quantity } = this.props;

    let amount = parseFloat(quantity);
    console.log(srcAdr);
    console.log(destAdr);
    console.log(amount);
    sendPayment(null, destAdr, amount);
  };

  render() {
    const { srcAdr, destAdr, quantity, handleChange } = this.props;

    return (
      <div>
        <h1>Make a Payment</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              type="text"
              placeholder="source address"
              name="srcAdr"
              value={srcAdr}
              onChange={handleChange}
            />
            <Form.Input
              type="text"
              placeholder="destination address"
              name="destAdr"
              value={destAdr}
              onChange={handleChange}
            />
            <Form.Input
              type="number"
              placeholder="Amount"
              name="quantity"
              value={quantity}
              width={3}
              onChange={handleChange}
            />
            <Form.Button content="Pay" />
          </Form.Group>
        </Form>
      </div>
    );
  }
}
