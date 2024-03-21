import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Layout/Spinner";
import "../styles/login.css";
// import "../styles/index.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const clientless = process.env.FRONTEND_URL + "/api/v1/users/login";

  // console.log(clientless);

  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("http://localhost:8080/api/v1/users/login", values);
      setLoading(false);
      message.success("Login Successful");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/expense");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };
  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
    
      
    
        {/* <a href="/expense" className="logo d-flex align-items-center">
    <img src="assets/img/logo1.png" alt="" />
    <span className="d-none d-lg-block">EXpense</span>
  </a> */} 
  
     <div className="login-page ">
        {loading && <Spinner />}
          <div className="col-md-4 login-form">
        <Form layout="vertical" onFinish={submitHandler}>
          <h4>Login to Your Account</h4>
          <i className="fa fa-user-plus u3" aria-hidden="true" />

          <Form.Item name="email" rules={[
              {
                required: true,
                message: " Email required!",
              },
            ]}>
            <Input type="email" placeholder="username"required />
          </Form.Item>
          <i className="fa fa-key u4" aria-hidden="true" />
          <Form.Item  name="password" rules={[
              {
                required: true,
                message: " Password required!",
              },
            ]}>
            <Input type="password" placeholder="password" required />
          </Form.Item>

         
            <button className="btn w-100 my-2">Login</button><br/>
         
            Don't have account? <Link to="/register">Create an account</Link>
        </Form>
        <div className="img-container">
    <img src="assets/img/login.png" alt="Login-screen-picture" />
  </div>
      </div>
      </div>

      {/* <>
  <div className="container">
    <div className="mob-hidden">
    </div>
    <div className="top-heading">
      <h1>Expense Management System</h1>
    </div>
    <Form
    
      action="index.php"
      method="post"
      onFinish={submitHandler}
      id="form1"
    >
      
      <div className="group">
        <div className="form-controller">
          <i className="fa fa-user-plus u3" aria-hidden="true" />
          <input
            type="email"
            name="email"
            placeholder="Username"
            id="user1"
            rules={[
              {
                required: true,
                message: " Email required!",
              },
            ]}
          />
          <br />
          
        </div>
        <div className="form-controller">
          <i className="fa fa-key u4" aria-hidden="true" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="pass1"
            autoComplete="on"
            rules={[
              {
                required: true,
                message: " Password required!",
              },
            ]}
          />
          <br />
          
        </div>
      </div>
      <button type="submit" className="btn btn-outline-success" name="login">
        Log In
      </button>
      Don't have account? <Link to="/register">Create an account</Link>

    </Form>
  </div>
 
  <div className="img-container">
    <img src="static/images/login.png" alt="Login-screen-picture" />
  </div>
</>*/}

    </>
  );
}; 

export default Login;
