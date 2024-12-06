import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAddress, setBirthday, setAboutMe } from "../rootSlice";
import { useSelector } from "react-redux";
import "../styles/pages/OnboardingThird.css";

export const OnboardingThird = () => {
  const baseUrl = process.env.NODE_ENV === 'development' 
    ? "http://localhost:5000/"
    : "https://zealthy-7851dac922ca.herokuapp.com/";

  const [street_address, set_street_address] = useState("");
  const [city_address, set_city_address] = useState("");
  const [state_address, set_state_address] = useState("");
  const [zip_code_address, set_zip_code_address] = useState("");

  const [birthday, setLocalBirthday] = useState("");
  const [aboutMe, setAboutMeInput] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const page3Components = useSelector((state) => state.admin.page3Components);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fields = {};

    if (page3Components.includes("aboutMe")) {
      dispatch(setAboutMe(aboutMe));
      fields.about_me = aboutMe;
    }
    if (page3Components.includes("address")) {
      fields.address = {
        street_address,
        city_address,
        state_address,
        zip_code_address
      };
      dispatch(setAddress(fields.address));
    }
    if (page3Components.includes("birthday")) {
      dispatch(setBirthday(birthday));
      fields.birthday = birthday;
    }

    sendPostRequest(fields);
  };

  async function sendPostRequest(fields) {
    try {
      console.log("Sending request to:", baseUrl + "third-form");
      console.log("Request body:", fields);
      
      const res = await fetch(baseUrl + "third-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fields),
        credentials: "include",
      });

      console.log("Response status:", res.status);

      if (!res.ok) {
        const errorMessage = await res.text();
        console.error("Server error response:", errorMessage);
        throw new Error(`Error: ${res.statusText}, ${errorMessage}`);
      }

      const data = await res.json();
      console.log("Response data:", data);
      
      navigate("/data");
    } catch (error) {
      console.error("Request failed:", {
        message: error.message,
        stack: error.stack
      });
    }
  }

  return (
    <div className="onboarding-third-container d-flex justify-content-center align-items-center vh-100">
      <div className="form-container w-75">
        <form
          onSubmit={handleSubmit}
          className="form-group p-4 border rounded bg-light"
          style={{ maxHeight: "80vh", overflowY: "auto" }}
        >
          {page3Components.includes("aboutMe") && (
            <div className="form-group mb-4">
              <h3 className="mb-3">About Me</h3>
              <textarea
                id="about-me-input"
                name="about-me-input"
                placeholder="Tell us about yourself"
                value={aboutMe}
                onChange={(e) => setAboutMeInput(e.target.value)}
                className="form-control w-100"
                rows="4"
                style={{ resize: "vertical", minHeight: "120px" }}
                required={page3Components.includes("aboutMe")}
              />
            </div>
          )}

          {page3Components.includes("address") && (
            <div className="form-group mb-4">
              <h3 className="mb-3">Address Information</h3>
              <div className="mb-3">
                <input
                  placeholder="Enter Street Address Here"
                  type="text"
                  id="street_address"
                  name="street_address"
                  value={street_address}
                  onChange={(e) => set_street_address(e.target.value)}
                  className="form-control w-100"
                  required={page3Components.includes("address")}
                />
              </div>
              <div className="mb-3">
                <input
                  placeholder="Enter City Here"
                  type="text"
                  id="city_address"
                  name="city_address"
                  value={city_address}
                  onChange={(e) => set_city_address(e.target.value)}
                  className="form-control w-100"
                  required={page3Components.includes("address")}
                />
              </div>
              <div className="mb-3">
                <input
                  placeholder="Enter State Here"
                  type="text"
                  id="state_address"
                  name="state_address"
                  value={state_address}
                  onChange={(e) => set_state_address(e.target.value)}
                  className="form-control w-100"
                  required={page3Components.includes("address")}
                />
              </div>
              <div className="mb-3">
                <input
                  placeholder="Enter Zip Code Here"
                  type="text"
                  id="zip_code_address"
                  name="zip_code_address"
                  value={zip_code_address}
                  onChange={(e) => set_zip_code_address(e.target.value)}
                  className="form-control w-100"
                  required={page3Components.includes("address")}
                />
              </div>
            </div>
          )}

          {page3Components.includes("birthday") && (
            <div className="form-group mb-4">
              <h3 className="mb-3">Birthday</h3>
              <input
                type="date"
                id="birthday-input"
                value={birthday}
                onChange={(e) => setLocalBirthday(e.target.value)}
                className="form-control w-100"
                required={page3Components.includes("birthday")}
              />
            </div>
          )}

          <div className="text-center">
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
