import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestionAnswer } from "../actions/shared";
import { Redirect } from "react-router-dom";
import PageNotFound from "./PageNotFound";

class QuestionPoll extends Component {
  state = {
    optionSelected: "",
    answerSubmitted: false,
  };

  handleSubmit(e, questionId) {
    e.preventDefault();

    const { dispatch } = this.props;
    const { optionSelected } = this.state;

    dispatch(handleAddQuestionAnswer(questionId, optionSelected));

    this.setState(() => ({
      optionSelected: "",
      answerSubmitted: true,
    }));
  }

  handleInputChange = (e) => {
    const text = e.target.value;

    this.setState(() => ({
      optionSelected: text,
    }));
  };

  render() {
    const { optionSelected, answerSubmitted } = this.state;
    const { id, question, author, pageNotFound } = this.props;

    if (pageNotFound === true) {
      return <PageNotFound />;
    }

    const redirectTo = `/question/${id}/results`;

    if (answerSubmitted === true) {
      return <Redirect to={redirectTo} />;
    }

    return (
      <div>
        <div className="projectContainer">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-sm-8">
                <div className="card">
                  <div className="card-header bold">
                    {author.name} asks would you rather...
                  </div>
                  <div className="card-body">
                    <div className="container">
                      <div className="row justify-content-center">
                        <div className="col-sm-4 border-right center">
                          <img
                            style={{ width: "100px", height: "100px" }}
                            src={author.avatarURL}
                            alt={`Avatar of ${author.name}`}
                            className="avatar"
                          />
                        </div>
                        <div className="col-sm-8">
                          <div className="question-info">
                            <form onSubmit={(e) => this.handleSubmit(e, id)}>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="questionPoll"
                                  id="optionOne"
                                  value="optionOne"
                                  onChange={this.handleInputChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="optionOne"
                                >
                                  {question.optionOne.text}
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="questionPoll"
                                  id="optionTwo"
                                  value="optionTwo"
                                  onChange={this.handleInputChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="exampleRadios2"
                                >
                                  {question.optionTwo.text}
                                </label>
                              </div>
                              <button
                                className="btn btn-outline-primary m-15-top"
                                type="submit"
                                disabled={optionSelected === ""}
                              >
                                Submit
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ login, questions, users, match }, props) {
  const { id } = props.match.params;

  let pageNotFound = true;
  let author = "";
  let specificQuestion = "";

  if (questions[id] !== undefined) {
    pageNotFound = false;
    specificQuestion = questions[id];
    author = users[specificQuestion["author"]];
  }

  return {
    id,
    question: specificQuestion,
    author: author,
    authedUser: login.loggedInUser.id,
    pageNotFound: pageNotFound,
  };
}

export default connect(mapStateToProps)(QuestionPoll);
