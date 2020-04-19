import _ from "lodash";
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import formFields from "./formFields";

function SurveyFormReview({ onCancel, formValues, submitSurvey, history }) {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please Confirm Your Selection</h5>
      <div>{reviewFields}</div>
      <button className="orange white-text btn-flat left" onClick={onCancel}>
        <i className="material-icons right">undo</i> Back
      </button>
      <button
        onClick={() => {
          submitSurvey(formValues, history);
        }}
        type="submit"
        className="green btn-flat right white-text"
      >
        Send Survey <i className="material-icons right">email</i>
      </button>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values,
  };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
