// SurveyNew shows form and form review
import React, { Component } from "react";
import SurveyForm from "./SurveyForm";
class SurveyNew extends Component {
  render() {
    return (
      <div>
        <h1>Let's Create a New Survey</h1>
        <SurveyForm />
      </div>
    );
  }
}
export default SurveyNew;
