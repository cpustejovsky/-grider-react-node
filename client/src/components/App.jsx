import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions";
import history from "../history";
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyForm from "./SurveyForm";
import SurveyList from "./SurveyList";
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="container">
        <BrowserRouter history={history}>
          <Header />
          <div>
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/surveys" exact component={Dashboard} />
              <Route path="/surveys/new" exact component={SurveyForm} />
              <Route path="/surveys/list" exact component={SurveyList} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { fetchUser })(App);
