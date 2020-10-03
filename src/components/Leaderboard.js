import React from "react";
import { useSelector } from "react-redux";

export default function LeaderBoard() {
  const users = useSelector(({ users }) => users);

  const usersInfo = Object.keys(users)
    .map((key, index) => {
      let questionsAnswered = Object.keys(users[key].answers).length;
      let questionsAsked = Object.keys(users[key].questions).length;

      return {
        name: users[key].name,
        avatar: users[key].avatarURL,
        questionsAnswered: questionsAnswered,
        questionsAsked: questionsAsked,
        totalScore: questionsAnswered + questionsAsked,
      };
    })
    .sort((a, b) => {
      if (b.totalScore < a.totalScore) return -1;
      if (b.totalScore > a.totalScore) return 1;
      return 0;
    });

  return (
    <div>
      {usersInfo.map((user, index) => {
        return (
          <div key={index}>
            <div>{user.name}</div>
            <img
              style={{ width: "100px", height: "100px" }}
              src={user.avatar}
              alt={`Avatar of ${user.name}`}
              className="avatar"
            />
            <span>Answered Questions:</span>
            <span>{user.questionsAnswered}</span>
            <strong>Created Questions:</strong>
            <span>{user.questionsAsked}</span>
            <span>{user.totalScore}</span>
          </div>
        );
      })}
    </div>
  );
}
