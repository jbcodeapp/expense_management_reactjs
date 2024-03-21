import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [profilePhoto, setProfilePhoto] = useState("null");
  const [loginuser, setLoginuser] = useState("");
  const fileInputRef = useRef(null);

  const handleFileUploadButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Get the uploaded file
    setProfilePhoto(URL.createObjectURL(file));
    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem("profilePhoto", reader.result);

      // Set the uploaded file as the profile photo
      setProfilePhoto(reader.result);
    };

    if (file) {
      // Read the file as a data URL
      reader.readAsDataURL(file);
    }
  };
  const handleDeleteButtonClick = () => {
    // Perform deletion action, e.g., remove the image from the server
    setProfilePhoto(null);
  };
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginuser(user);
    }
    const storedPhoto = localStorage.getItem("profilePhoto");
    if (storedPhoto) {
      setProfilePhoto(storedPhoto);
    }
  }, []);
  return (
    <Layout>
      <div className="pagetitle">
        <h1>Profile</h1>
        <nav>
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="/expense">Home</a>
            </li>
            <li class="breadcrumb-item">Users</li>
            <li class="breadcrumb-item active">Profile</li>
          </ol>
        </nav>
      </div>
      <section className="section profile">
        <div className="row">
          <div className="col-xl-4">
            <div className="card">
              <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                <label htmlFor="profilePhotoInput">
                  {profilePhoto && (
                    <img
                      src={profilePhoto}
                      alt="Profile"
                      className="rounded-circle"
                      style={{ maxWidth: "200px", maxHeight: "200px" }}
                    />
                  )}
                  <input
                    type="file"
                    id="profilePhotoInput"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                  />
                </label>
                <h2> {loginuser && loginuser.name}</h2>

                {/* <div className="social-links mt-2">
                  <a href="#" className="twitter">
                    <i className="bi bi-twitter" />
                  </a>
                  <a href="#" className="facebook">
                    <i className="bi bi-facebook" />
                  </a>
                  <a href="#" className="instagram">
                    <i className="bi bi-instagram" />
                  </a>
                  <a href="#" className="linkedin">
                    <i className="bi bi-linkedin" />
                  </a>
                </div> */}
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="card">
              <div className="card-body pt-3">
                {/* Bordered Tabs */}
                <ul className="nav nav-tabs nav-tabs-bordered">
                  {/* <li className="nav-item">
                    <button
                      className="nav-link active"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-overview"
                    >
                      Overview
                    </button>
                  </li> */}
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-edit"
                    >
                      Edit Profile
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-change-password"
                    >
                      Change Password
                    </button>
                  </li>
                </ul>
                <div className="tab-content pt-4">
                  {/* <div
                    className="tab-pane fade show active profile-overview"
                    id="profile-overview"
                  >
                    <h5 className="card-title">Profile Details</h5>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label ">Full Name</div>
                      <div className="col-lg-9 col-md-8">{loginuser.name}</div>
                    </div>
                    
                   
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Country</div>
                      <div className="col-lg-9 col-md-8">USA</div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Address</div>
                      <div className="col-lg-9 col-md-8">
                        A108 Adam Street, New York, NY 535022
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Phone</div>
                      <div className="col-lg-9 col-md-8">
                        (436) 486-3538 x29071
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Email</div>
                      <div className="col-lg-9 col-md-8">{loginuser.email}</div>
                    </div>
                  </div> */}
                  <div
                    className="tab-pane fade show active profile-edit pt-3"
                    id="profile-edit"
                  >
                    {/* Profile Edit Form */}
                    <form>
                      <div className="row mb-3">
                        <label
                          htmlFor="profileImage"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          Profile Image
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <label htmlFor="profilePhotoInput">
                            {profilePhoto && (
                              <img
                                src={profilePhoto}
                                alt="Profile"
                                className="rounded-similique"
                                style={{
                                  maxWidth: "200px",
                                  maxHeight: "200px",
                                }}
                              />
                            )}
                          </label>
                          <div className="pt-2">
                            <input
                              type="file"
                              accept="image/*"
                              style={{ display: "none" }}
                              ref={fileInputRef}
                              onChange={handleFileUpload}
                            />
                            <a
                              href="#"
                              className="btn btn-primary btn-sm"
                              title="Upload new profile image"
                              onClick={handleFileUploadButtonClick}
                            >
                              <i className="bi bi-upload" />
                            </a>
                            <a
                              href="#"
                              className="btn btn-danger btn-sm"
                              title="Remove my profile image"
                              onClick={handleDeleteButtonClick}

                            >
                              <i className="bi bi-trash" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label
                          htmlFor="fullName"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          Full Name
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="fullName"
                            type="text"
                            className="form-control"
                            id="fullName"
                            value={loginuser.name}
                          />
                          
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label
                          htmlFor="Country"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          Country
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="country"
                            type="text"
                            className="form-control"
                            id="Country"
                            defaultValue="USA"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label
                          htmlFor="Address"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          Address
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="address"
                            type="text"
                            className="form-control"
                            id="Address"
                            defaultValue="A108 Adam Street, New York, NY 535022"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label
                          htmlFor="Phone"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          Phone
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="phone"
                            type="text"
                            className="form-control"
                            id="Phone"
                            defaultValue="(436) 486-3538 x29071"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label
                          htmlFor="Email"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          Email
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="email"
                            type="email"
                            className="form-control"
                            id="Email"
                            value={loginuser.email}
                          />
                        </div>
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn btn-primary">
                          Save Changes
                        </button>
                      </div>
                    </form>
                    {/* End Profile Edit Form */}
                  </div>
                  <div
                    className="tab-pane fade pt-3"
                    id="profile-change-password"
                  >
                    {/* Change Password Form */}
                    <form>
                      <div className="row mb-3">
                        <label
                          htmlFor="currentPassword"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          Current Password
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="password"
                            type="password"
                            className="form-control"
                            id="currentPassword"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label
                          htmlFor="newPassword"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          New Password
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="newpassword"
                            type="password"
                            className="form-control"
                            id="newPassword"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label
                          htmlFor="renewPassword"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          Re-enter New Password
                        </label>
                        <div className="col-md-8 col-lg-9">
                          <input
                            name="renewpassword"
                            type="password"
                            className="form-control"
                            id="renewPassword"
                          />
                        </div>
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn btn-primary">
                          Change Password
                        </button>
                      </div>
                    </form>
                    {/* End Change Password Form */}
                  </div>
                </div>
                {/* End Bordered Tabs */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UserProfile;
