import React, { useState } from "react";
import { useSelector } from "react-redux";
import Question from "./Question";

export default function Dashboard(props) {
  const [questionsToShow, setQuestionsToShow] = useState("unanswered");
  const [activeTab, setActiveTab] = useState("unanswered");

  const questions = useSelector(({ questions }) => {
    return Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    );
  });

  const handleTabChange = (tab) => {
    setQuestionsToShow(tab);
    setActiveTab(tab);
  };

  return (
    <div>
      <button
        type="button"
        className={
          "btn btn-info " + (activeTab === "unanswered" ? "active" : null)
        }
        onClick={() => handleTabChange("unanswered")}
      >
        Unanswered Questions
      </button>
      <button
        type="button"
        className={
          "btn btn-info " + (activeTab === "answered" ? "active" : null)
        }
        onClick={() => handleTabChange("answered")}
      >
        Answered Questions
      </button>

      {questions.map((id) => {
        return <Question key={id} id={id} questionsToShow={questionsToShow} />;
      })}
    </div>
  );
}
