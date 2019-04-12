import React, { Component } from "react";
import { Form } from "semantic-ui-react";
export default class Payment extends Component {
  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    //get the submitted data
    const { makePayment } = this.props;
    makePayment();
  };

  render() {
    const { srcAdr, destAdr, quantity } = this.props;

    return (
      <div>
        <h1>Make a Payment</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              type="text"
              placeholder="source address"
              name="source"
              value={srcAdr}
              onChange={this.handleChange}
            />
            <Form.Input
              type="text"
              placeholder="destination address"
              name="dest"
              value={destAdr}
              onChange={this.handleChange}
            />
            <Form.Input
              type="number"
              placeholder="Amount"
              name="quantity"
              value={quantity}
              width={3}
              onChange={this.handleChange}
            />
            <Form.Button content="Pay" />
          </Form.Group>
        </Form>
      </div>
    );
  }
}
