import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions";
import history from "../history";
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyList from "./surveys/SurveyList";
import SurveyNew from "./surveys/SurveyNew";
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <BrowserRouter history={history}>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/surveys" exact component={Dashboard} />
            <Route path="/surveys/new" exact component={SurveyNew} />
            <Route path="/surveys/list" exact component={SurveyList} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps, { fetchUser })(App);
