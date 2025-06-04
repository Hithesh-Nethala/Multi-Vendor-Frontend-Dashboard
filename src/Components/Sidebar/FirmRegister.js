import React, { useState } from "react";
import "../Styling/FirmRegister.css";
import axios from "axios";
import { API_URL } from '../apiPath'
const FirmRegister = () => {
  const [value, setValue] = useState({
    name: "",
    address: "",
    category: [],
    region: [],
    offer: "",
    image: "",
  });
  const [status, setStatus] = useState(null);
  const [statusType, setStatusType] = useState(""); // Track success or error
  const token = localStorage.getItem('ownertoken')
  const changeHandle = (e) => {
    const { name, value, type, checked, files } = e.target;

    setValue((prevState) => {
      if (type === "checkbox") {
        return {
          ...prevState,
          [name]: checked
            ? [...prevState[name], value]
            : prevState[name].filter((item) => item !== value),
        };
      } else if (type === "file") {
        return { ...prevState, image: files[0] }; // Store actual file
      } else {
        return { ...prevState, [name]: value };
      }
    });
  };

  const submitHandle = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", value.name);
    formData.append("address", value.address);
    formData.append("category", JSON.stringify(value.category));
    formData.append("region", JSON.stringify(value.region));
    formData.append("offer", value.offer);
    formData.append("image", value.image);

    try {
      axios
        .post(`${API_URL}/firm/register`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-token": localStorage.getItem("ownertoken"),
          },
        })
        .then((res) => {
          setStatus(res.data.message);
          localStorage.setItem('firmid',res.data.firmid)
          setStatusType("success"); // Set status type to success
        })
        .catch((err) => {
          setStatus(err.response.data.message);
          setStatusType("error"); // Set status type to error
        });
    } catch (error) {
      console.log(error);
    }
    setValue({name: "",address: "",category: [],region: [],offer: "",image: "",})
  };

  return (
    token?(
    <div className="firm-register">
      <h4 className="firm-register-title">Firm Registration</h4>
      <form className="firm-register-form" onSubmit={submitHandle}>
        <input
          type="text"
          name="name"
          value={value.name}
          placeholder="Enter Firm Name"
          className="firm-register-input"
          onChange={changeHandle}
          required
        />
        <input
          type="text"
          name="address"
          value={value.address}
          placeholder="Enter Address"
          className="firm-register-input"
          onChange={changeHandle}
          required
        />
        <label className="firm-register-label">Category</label>
        <div className="firm-register-checkbox-group">
          <label>
            <input
              type="checkbox"
              name="category"
              value="veg"
              className="firm-register-checkbox"
              onChange={changeHandle}
            />
            Veg
          </label>
          <label>
            <input
              type="checkbox"
              name="category"
              value="non-veg"
              className="firm-register-checkbox"
              onChange={changeHandle}
            />
            Non-Veg
          </label>
        </div>
        <label className="firm-register-label">Region</label>
        <div className="firm-register-checkbox-group">
          <label>
            <input
              type="checkbox"
              name="region"
              value="north-indian"
              className="firm-register-checkbox"
              onChange={changeHandle}
            />
            North Indian
          </label>
          <label>
            <input
              type="checkbox"
              name="region"
              value="south-indian"
              className="firm-register-checkbox"
              onChange={changeHandle}
            />
            South Indian
          </label>
          <label>
            <input
              type="checkbox"
              name="region"
              value="chinese"
              className="firm-register-checkbox"
              onChange={changeHandle}
            />
            Chinese
          </label>
          <label>
            <input
              type="checkbox"
              name="region"
              value="bakery"
              className="firm-register-checkbox"
              onChange={changeHandle}
            />
            Bakery
          </label>
        </div>
        <input
          type="text"
          name="offer"
          value={value.offer}
          placeholder="Provide Offer"
          className="firm-register-input"
          onChange={changeHandle}
        />
        <input
          type="file"
          name="image"
          className="firm-register-file"
          onChange={changeHandle}
        />
        {status !== null ? (
          <p className={`status-message ${statusType}`}>{status}</p>
        ) : null}
        <button type="submit" className="firm-register-button">
          Register
        </button>
      </form>

    </div>):(<p className="no-token-message">Please Log In...</p>)
  );
};

export default FirmRegister;
