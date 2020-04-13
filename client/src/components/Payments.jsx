import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import { handleToken } from "../actions";
class Payments extends Component {
  onToken = (token) => {
    console.log(token);
    this.props.handleToken(token);
  };

  render() {
    return (
      <StripeCheckout
        name={"Emaily"}
        description={"$5.00 for five survey credits"}
        amount={5 * 100}
        token={this.onToken}
        stripeKey={process.env.REACT_APP_STRIPE_API_PUBLIC_KEY}
      >
        <a>Add Credits</a>
      </StripeCheckout>
    );
  }
}
const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps, { handleToken })(Payments);
