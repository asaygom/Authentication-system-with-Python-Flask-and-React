import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Login = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    actions.login(loginInfo, navigate);
  };

  return (
    <div className="d-flex align-items-center py-4 bg-body-tertiary">
      <div className="form-signin m-auto">
        <form className="mb-2" onSubmit={handleSubmit}>
          <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating">
            <input type="email" className="form-control" id="email" name="email" onChange={(event)=>handleChange(event)} value={loginInfo.email} placeholder="name@example.com"/>
            <label for="email">Email address</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="password" name="password" onChange={(event)=>handleChange(event)} value={loginInfo.password} placeholder="Password"/>
            <label for="password">Password</label>
          </div>
          <input type="submit" value="Log in" className="btn btn-primary w-100 py-2 mt-2" />
        </form>
        <Link to='/signup' className="mt-5 mb-3 text-body-secondary">Don't have an account?</Link>
      </div>
    </div>
  );
};

export default Login;
