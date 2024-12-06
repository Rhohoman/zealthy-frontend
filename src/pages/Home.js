import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEmail, setPassword } from "../rootSlice";
import "../styles/pages/Home.css";

const baseUrl = process.env.NODE_ENV === 'development' 
  ? "http://localhost:5000/"
  : "https://zealthy-7851dac922ca.herokuapp.com/";

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => {
    setInputEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setInputPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendPostRequest(inputEmail, inputPassword);
      if (response.status === "success") {
        dispatch(setEmail(inputEmail));
        dispatch(setPassword(inputPassword));
        navigate("/onboarding/2");
      } else {
        setError("Failed to create user. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  async function sendPostRequest(email, password) {
    try {
      const res = await fetch(baseUrl + "initial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include"
      });

      const data = await res.json();
      console.log("Server response:", data);
      return data;
    } catch (error) {
      console.error("Request failed:", error);
      throw error;
    }
  }

  return (
    <div className="home-container d-flex justify-content-center align-items-center vh-100">
      <form
        onSubmit={handleSubmit}
        className="form-group onboarding-form w-75 p-4 border rounded bg-light d-flex flex-column"
        style={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        
        <div id="input-container" className="mb-4">
          <div id="input-form-group" className="form-group mb-4">
            <label htmlFor="email-input" className="form-label mb-2 h3">
              Email address
            </label>
            <input
              id="email-input"
              name="email-input"
              type="email"
              required
              className="form-control"
              onChange={handleEmailChange}
              placeholder="Enter email"
            />
          </div>
          <div id="input-form-group" className="form-group mb-4">
            <label htmlFor="password-input" className="form-label mb-2 h3">
              Password
            </label>
            <input
              id="password-input"
              type="password"
              required
              className="form-control"
              onChange={handlePasswordChange}
              placeholder="Enter password"
            />
          </div>
        </div>

        <div className="mt-auto text-center">
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
