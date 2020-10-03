import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { handleAddQuestion } from "../actions/shared";
import { Redirect } from "react-router-dom";

export default function NewQuestions() {
  const dispatch = useDispatch();
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoTextt] = useState("");
  const [toDashboard, setToDashboard] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleOptionOneTextChange = (e) => {
    const text = e.target.value;

    setOptionOneText(text);
  };

  const handleOptionTwoTextChange = (e) => {
    const text = e.target.value;
    setOptionTwoTextt(text);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    dispatch(
      handleAddQuestion(optionOneText, optionTwoText, () => {
        setToDashboard(true);
        setOptionOneText("");
        setOptionTwoTextt("");
      })
    );
  };

  if (toDashboard === true) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <div className="projectContainer">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-sm-8">
              <div className="card">
                <div className="card-header bold">Create New Question</div>
                <div className="card-body">
                  <div className="container">
                    <div className="row justify-content-center p-20-top-bottom">
                      <div className="col-sm-12">
                        <p>
                          <strong>Would You Rather...?</strong>
                        </p>
                        <form onSubmit={handleSubmit}>
                          <div className="form-group">
                            <input
                              className="form-control"
                              placeholder="Enter option one text here..."
                              value={optionOneText}
                              onChange={handleOptionOneTextChange}
                            />
                          </div>
                          <div className="form-group">
                            <input
                              className="form-control"
                              placeholder="Enter option two text here..."
                              value={optionTwoText}
                              onChange={handleOptionTwoTextChange}
                            />
                          </div>
                          <input
                            type="submit"
                            name="submit"
                            id="submit"
                            value={
                              hasSubmitted ? "Submitting Question..." : "Submit"
                            }
                            className="btn btn-outline-primary"
                            disabled={
                              optionOneText === "" ||
                              optionTwoText === "" ||
                              hasSubmitted
                            }
                          />
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
  );
}
