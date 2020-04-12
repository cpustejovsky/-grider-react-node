import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import history from "../history";
import Header from './Header'
import Landing from './Landing'
import Dashboard from './Dashboard'
import SurveyForm from './SurveyForm'
import SurveyList from './SurveyList'
import "materialize-css"
function App() {
  return (
    <div>
      <BrowserRouter history={history}>
        <Header/>
        <div>
          <Switch>
            <Route path="/" exact component={Landing}/>
            <Route path="/surveys" exact component={Dashboard}/>
            <Route path="/surveys/new" exact component={SurveyForm}/>
            <Route path="/surveys/list" exact component={SurveyList}/>
          </Switch>
        </div>
      </BrowserRouter>
      {/* <h1>Grider Node/React App</h1>
      <div>
        <a href="/auth/google">Sign In with Google</a>
      </div>
      <div>
        <a href="/api/current_user">Check Current User</a>
      </div>
      <div>
        <a href="/logout">Log Out</a>
      </div> */}
    </div>
  );
}

export default App;
