import React from "react";
import { connect } from "react-redux";
import { formatQuestion } from "../utils/helpers";
import { Link } from "react-router-dom";

const Question = (props) => {
  const { question } = props;

  if (question === null) {
    return <p>This question doesn't exist.</p>;
  }

  const { name, id, avatar, optionOne, optionTwo, hasVoted } = question;
  console.log(avatar);

  if (props.questionsToShow === "answered" && hasVoted !== true) {
    return false;
  } else if (props.questionsToShow === "unanswered" && hasVoted === true) {
    return false;
  }

  let viewPollLink = "";

  if (props.questionsToShow === "answered") {
    viewPollLink = `/question/${id}/results`;
  } else if (props.questionsToShow === "unanswered") {
    viewPollLink = `/question/${id}`;
  }

  return (
    <div className="margin-top-10">
      <div className="card">
        <div className="card-header bold">{name} asks would you rather...</div>
        <div className="card-body">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-sm-4 border-right center">
                <img
                  style={{ width: "100px", height: "100px" }}
                  src={avatar}
                  alt={`Avatar of ${name}`}
                  className="avatar"
                />
              </div>
              <div className="col-sm-8">
                <div className="question-info">
                  <p className="center">
                    {optionOne.text} <strong>OR</strong> {optionTwo.text}
                  </p>
                  <Link to={viewPollLink} className="center">
                    <button className="btn btn-outline-primary reset-vertical-margin ">
                      View Poll
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps({ login, users, questions }, { id, questionsToShow }) {
  const question = questions[id];

  return {
    authedUser: login.loggedInUser.id,
    question: formatQuestion(
      question,
      users[question.author],
      login.loggedInUser.id
    ),
    questionsToShow,
  };
}

export default connect(mapStateToProps)(Question);
