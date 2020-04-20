import React from "react";
import { Link } from "react-router-dom"
import SurveyList from "./surveys/SurveyList";

function Dashboard() {
  return (
    <>
      <h3>Dashboard</h3>
      <SurveyList/>
      <div className="fixed-action-btn">
        <Link to="surveys/new" className="btn-floating btn-large red">
          <i className="large material-icons">add</i>
        </Link>
      </div>
    </>
  );
}
export default Dashboard;
