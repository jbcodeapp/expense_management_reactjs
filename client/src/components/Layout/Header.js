/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { UserOutlined } from "@ant-design/icons";
import { message } from "antd";
import "../../styles/header.css";

const Header = () => {
  const [loginuser, setLoginuser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginuser(user);
    }
  }, []);
  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/expense");
  };
  // const categoryHandler = () => {
  //   navigate("/categoryPage");
  // };

  return (
    <>
      {/* <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">
              Expense Management
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button className="btn " onClick={categoryHandler}>
                  Category
                </button>
              </li>
              <li className="nav-item ">
              
                <h6 className="nav-link ">
                  <UserOutlined /> {loginuser && loginuser.name}
                </h6>
              </li>
              <li className="nav-item">
                <button className="btn btn-danger my-1" onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
       
              */}
      <>
        <div className="container-fluid">
          <header
            id="header"
            className="header top d-flex align-items-center my-2 "
          >
            <div className="d-flex align-items-center justify-content-between">
              <a href="/expense" className="logo d-flex align-items-center">
                <img src="assets/img/logo1.png" alt="" />
                <span className="d-none d-lg-block">EXpense</span>
              </a>
            </div>
            {/* End Logo */}
            <div className="search-bar">
              <form
                className="search-form d-flex align-items-center"
                method="POST"
                action="#"
              >
                <input
                  type="text"
                  name="query"
                  placeholder="Search"
                  title="Enter search keyword"
                />
                <button type="submit" title="Search">
                  <i className="bi bi-search" />
                </button>
              </form>
            </div>
            {/* End Search Bar */}
            <nav className="header-nav ms-auto ">
              <ul className="d-flex align-items-center">
                <li className="nav-item d-block d-lg-none">
                  <a className="nav-link nav-icon search-bar-toggle " href="#">
                    <i className="bi bi-search" />
                  </a>
                </li>
                <li className="nav-item dropdown pe-3">
                  {loginuser ? (
                    <>
                      <a
                        className="nav-link nav-profile d-flex align-items-center pe-0"
                        href="#"
                        data-bs-toggle="dropdown"
                      >
                        <span className="d-none d-md-block dropdown-toggle ps-2">
                          <img
                            src="assets/img/female.jpg"
                            alt="Profile"
                            class="rounded-circle"
                          />{" "}
                          {loginuser && loginuser.name}
                        </span>
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                        <li className="dropdown-header">
                          <h6>Kevin Anderson</h6>
                          <span>Web Designer</span>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <a
                            className="dropdown-item d-flex align-items-center"
                            href="/UserProfile"
                          >
                            <i className="bi bi-person" />
                            <span>My Profile</span>
                          </a>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <a
                            className="dropdown-item d-flex align-items-center"
                            href="users-profile.html"
                          >
                            <i className="bi bi-gear" />
                            <span>Account Settings</span>
                          </a>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <a
                            className="dropdown-item d-flex align-items-center"
                            href="pages-faq.html"
                          >
                            <i className="bi bi-question-circle" />
                            <span>Need Help?</span>
                          </a>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li onClick={logoutHandler}>
                          <a className="dropdown-item d-flex align-items-center">
                            <i className="bi bi-box-arrow-right" />
                            <span>Sign Out</span>
                          </a>
                        </li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <div className="d-flex align-items-center">
                        <li className="nav-item mx-3">
                          <a className="nav-link" href="/register">
                            Register
                          </a>
                        </li>
                        <li className="nav-item mx-3">
                          <a className="nav-link" href="/login">
                            Login
                          </a>
                        </li>
                        <a
                          className="nav-link nav-profile d-flex align-items-center pe-0"
                          href="#"
                          data-bs-toggle="dropdown"
                        >
                          <span className="d-none d-md-block dropdown-toggle ps-2">
                            <img
                              src="assets/img/female.jpg"
                              alt="Profile"
                              class="rounded-circle"
                            />
                          </span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                          <li className="dropdown-header">
                            <h6>please log in to your account</h6>
                          </li>
                        </ul>
                      </div>
                    </>
                  )}
                </li>
              </ul>
            </nav>
          </header>
        </div>
      </>
    </>
  );
};

export default Header;
