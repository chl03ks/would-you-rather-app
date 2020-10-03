import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { receiveAuthLogout } from "../actions/auth";

export default function Logout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(receiveAuthLogout());
  }, [dispatch]);

  return <Redirect to="/login" />;
}
