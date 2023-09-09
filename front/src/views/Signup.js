import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";

const Signup = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const [signupInfo, setLoginInfo] = useState({
    email: "",
    password: "",
    name: "",
    last_name: "",
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    setLoginInfo({ ...signupInfo, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    actions.createUser(signupInfo, navigate);
  };

  return (
    <div className="d-flex align-items-center py-4 bg-body-tertiary">
      <div className="form-signin m-auto">
        <form className="mb-2" onSubmit={handleSubmit}>
          <h1 class="h3 mb-3 fw-normal">Register form</h1>
          <div className="form-floating">
            <input type="text" className="form-control" id="name" name="name" onChange={(event)=>handleChange(event)} value={signupInfo.name} placeholder="Alexis"/>
            <label for="name">Name</label>
          </div>
          <div className="form-floating">
            <input type="text" className="form-control" id="last_name" name="last_name" onChange={(event)=>handleChange(event)} value={signupInfo.last_name} placeholder="Alexis"/>
            <label for="last_name">Last name</label>
          </div>
          <div className="form-floating">
            <input type="email" className="form-control" id="email" name="email" onChange={(event)=>handleChange(event)} value={signupInfo.email} placeholder="name@example.com"/>
            <label for="email">Email address</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="password" name="password" onChange={(event)=>handleChange(event)} value={signupInfo.password} placeholder="Password"/>
            <label for="password">Password</label>
          </div>
          <input type="submit" value="Sign up" className="btn btn-primary w-100 py-2 mt-2" />
        </form>
        <Link to='/login' className="mt-5 mb-3 text-body-secondary">Have an account?</Link>
      </div>
    </div>
  );
};

export default Signup;