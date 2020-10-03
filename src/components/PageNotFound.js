import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

export default function PageNotFound() {
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    this.timeout = setTimeout(() => setRedirect(true), 1500);
    return () => {
      clearTimeout(this.timeout);
    };
  }, []);

  return redirect ? (
    <Redirect to="/" />
  ) : (
    <div>
      <h3 className="">Not Found</h3>
      <figure className="">
        <img className="" alt="" />
      </figure>
    </div>
  );
}
