import React, { Fragment, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import Dashboard from "./Dashboard";
import NewQuestion from "./NewQuestion";
import QuestionPoll from "./QuestionPoll";
import QuestionPollResults from "./QuestionPollResults";
import Leaderboard from "./Leaderboard";
import Navbar from "./Navbar";
import Login from "./Login";
import Logout from "./Logout";
import ProtectedRoute from "./ProtectedRoute";
import LoadingBar from "react-redux-loading";
import PageNotFound from "./PageNotFound";
import { handleGetQuestions } from "../actions/questions";

function App({ loading, loggedInUser, authenticated }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleGetQuestions());
  }, [dispatch]);

  return (
    <Router>
      <Fragment>
        <LoadingBar />
        {authenticated == null ? null : <Navbar loggedInUser={loggedInUser} />}
        {loading === true ? null : (
          <Switch>
            <ProtectedRoute
              path="/"
              exact
              component={Dashboard}
              isAuthenticated={authenticated}
            />
            <ProtectedRoute
              path="/question/:id"
              exact
              component={connect(mapStateToProps)(QuestionPoll)}
              isAuthenticated={authenticated}
            />
            <ProtectedRoute
              path="/question/:id/results"
              exact
              component={connect(mapStateToProps)(QuestionPollResults)}
              isAuthenticated={authenticated}
            />
            <ProtectedRoute
              path="/add"
              exact
              component={NewQuestion}
              isAuthenticated={authenticated}
            />
            <ProtectedRoute
              path="/leaderboard"
              exact
              component={Leaderboard}
              isAuthenticated={authenticated}
            />
            <Route path="/login" exact component={withRouter(Login)} />
            <Route path="/logout" exact component={withRouter(Logout)} />
            <Route component={PageNotFound} />
          </Switch>
        )}
      </Fragment>
    </Router>
  );
}

function mapStateToProps({ login }) {
  return {
    loading: false,
    loggedInUser: login.loggedInUser,
    authenticated: login.authenticated,
  };
}

export default connect(mapStateToProps)(App);
