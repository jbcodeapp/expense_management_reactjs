import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/register.css";
import { CountryDropdown } from "react-country-region-selector";

import Spinner from "../components/Layout/Spinner";
const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");

  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:8080/api/v1/users/register", values);
      message.success("Registration Successful");
      setLoading(false);
      navigate("/login");
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
      <div className="register-page">
        {loading && <Spinner />}
        <Form
          className="register-form"
          layout="vertical"
          onFinish={submitHandler}
        >
          <h1>Register Form</h1>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: " Name required!",
              },
            ]}
          >
            <Input type="text" required />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: " Email required!",
              },
            ]}
          >
            <Input type="email" required />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: " Password required!",
              },
            ]}
          >
            <Input type="password" required />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Phone number required!",
              },
              {
                pattern: /^[0-9]{10}$/,
                message: "Please enter a valid 10-digit mobile number!",
              },
            ]}
          >
            <Input
              type="tel"
              placeholder="Enter your mobile number"
              maxLength={10}
              required
            />
          </Form.Item>
          <Form.Item
            label="Country"
            name="country"
            rules={[
              {
                required: true,
                message: " Country required!",
              },
            ]}
            className="custom-form-item"
          >
           

            <CountryDropdown
            
            className="custom-country-dropdown"

              valueType="short"
              value={selectedCountry}
              onChange={(val) => setSelectedCountry(val)}
              style={{ width: "100%" }}
            />{" "}
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: " Address required!",
              },
            ]}
          >
            <Input type="text" required />
          </Form.Item>

          <div className="d-flex justify-content-between">
            <Link to="/login">Already Register? login here!</Link>
            <button className="btn ">Register</button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;
