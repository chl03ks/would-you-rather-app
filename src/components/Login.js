import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { handleGetUsers } from "../actions/users";
import { handleLoginUser } from "../actions/auth";
import LoadingBar from "react-redux-loading";

class Login extends Component {
  state = {
    userSelected: "",
  };

  componentDidMount() {
    this.props.dispatch(handleGetUsers());
  }

  handleChange = (e) => {
    const userSelected = e.target.value;

    this.setState(() => ({
      userSelected,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;

    dispatch(handleLoginUser(this.state.userSelected));
  };

  render() {
    if (this.props.loading === true || !this.props.users) {
      return <div />;
    }

    const { from } = this.props.location.state || { from: { pathname: "/" } };

    if (this.props.isAuthed) {
      return <Redirect to={from} />;
    }

    return (
      <div>
        <LoadingBar />
        <div className="container">
          <div className="login-form">
            <div className="main-div">
              <div className="panel">
                <h2>Login</h2>
                <p>Please select a user to log in as.</p>
              </div>
              <form id="Login" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <select
                    className="form-control"
                    id="userId"
                    onChange={(e) => this.handleChange(e)}
                  >
                    <option></option>
                    {Object.keys(this.props.users).map((user) => {
                      return (
                        <option
                          key={this.props.users[user].id}
                          value={this.props.users[user].id}
                        >
                          {this.props.users[user].name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={this.state.userSelected === ""}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users, login }) {
  return {
    loading: users === null,
    users,
    isAuthed: login.authenticated,
  };
}

export default connect(mapStateToProps)(Login);
