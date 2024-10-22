import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../reducer/user.reducer.js";
import "./edit.css"

function UserEdit() {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    userName: userData.userName || "",
    firstName: userData.firstName || "",
    lastName: userData.lastName || "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        userName: userData.userName || "",
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
      });
    }
  }, [userData]);

  const inputRefs = {
    userName: useRef(null),
    firstName: useRef(null),
    lastName: useRef(null),
  };

  let token = "";
  const getToken = () => {
    token = window.sessionStorage.getItem("token");
    if (!token) {
      token = window.localStorage.getItem("token");
    }
    return token;
  };
  getToken();

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userName: formData.userName,
          firstName: formData.firstName,
          lastName: formData.lastName,
        }),
      });
      if (response.ok) {
        dispatch(updateUser(formData));
      } else {
        console.error("Error during user info update.");
      }
    } catch (error) {
      console.error("Error during user info update.");
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData({
      userName: userData.userName,
      firstName: userData.firstName,
      lastName: userData.lastName,
    });
  };

  useEffect(() => {
    if (isEditing) {
      inputRefs.userName.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="user-edit-container">
      {isEditing ? (
        <form className="edit-form">
          <h1>Edit user info</h1>
          <div className="form-group">
            <label htmlFor="userName">User name:</label>
            <input
              ref={inputRefs.userName}
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstName">First name:</label>
            <input
              ref={inputRefs.firstName}
              type="text"
              id="firstName"
              name="firstName"
              disabled
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last name:</label>
            <input
              ref={inputRefs.lastName}
              type="text"
              id="lastName"
              name="lastName"
              disabled
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="button-group">
            <button type="button" className="save-button" onClick={handleSaveClick}>
              Save
            </button>
            <button type="button" className="cancel-button" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button className="edit-button" onClick={handleEditButtonClick}>
          Edit Name
        </button>
      )}
    </div>
  );
}

export default UserEdit;