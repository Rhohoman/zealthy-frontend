import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEmail, setPassword } from "../rootSlice";
import "../styles/pages/Home.css";

export const Home = () => {
  const baseUrl = "https://zealthy-7851dac922ca.herokuapp.com/";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const handleEmailChange = (e) => {
    setInputEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setInputPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendPostRequest(inputEmail, inputPassword);
    dispatch(setEmail(inputEmail));
    dispatch(setPassword(inputPassword));
    navigate("/onboarding/2");
  };

  async function sendPostRequest(email, password) {
    try {
      const res = await fetch(baseUrl + "initial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }
    } catch (error) {
      console.error("Request failed...", error);
    }
  }

  return (
    <div className="home-container d-flex justify-content-center align-items-center vh-100">
      <form
        onSubmit={handleSubmit}
        className="form-group onboarding-form w-75 p-4 border rounded bg-light d-flex flex-column"
        style={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        <div id="input-container" className="mb-4">
          <div id="input-form-group" className="form-group mb-4">
            <label htmlFor="email-input" className="form-label mb-2">
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
            <label htmlFor="password-input" className="form-label mb-2">
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
