import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAboutMe, setAddress, setBirthday } from "../rootSlice";
import "../styles/pages/OnboardingSecond.css";
export const OnboardingSecond = () => {
  const baseUrl = "https://zealthy-7851dac922ca.herokuapp.com/";

  const [inputAboutMe, setInputAboutMe] = useState("");
  const [inputBirthday, setInputBirthday] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [cityAddress, setCityAddress] = useState("");
  const [stateAddress, setStateAddress] = useState("");
  const [zipCodeAddress, setZipCodeAddress] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const page2Components = useSelector((state) => state.admin.page2Components);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fields = {};

    if (page2Components.includes("aboutMe")) {
      fields.aboutMe = inputAboutMe;
      dispatch(setAboutMe(inputAboutMe));
    }
    if (page2Components.includes("address")) {
      fields.address = {
        streetAddress,
        cityAddress,
        stateAddress,
        zipCodeAddress,
      };
      dispatch(setAddress(fields.address));
    }
    if (page2Components.includes("birthday")) {
      fields.inputBirthday = inputBirthday;
      dispatch(setBirthday(inputBirthday));
    }

    sendPostRequest(fields);

    navigate("/onboarding/3");
  };

  async function sendPostRequest(fields) {
    try {
      const res = await fetch(baseUrl + "second-form", {
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
        throw new Error(`Error: ${res.statusText}, ${errorMessage}`);
      }
      const data = await res.json();
      console.log("Response data:", data);
    } catch (error) {
      console.error("Request failed...", error);
    }
  }

  return (
    <div className="second-step d-flex justify-content-center align-items-center vh-100">
      <form
        id="third-step"
        onSubmit={handleSubmit}
        className="onboarding-form w-75 p-4 border rounded bg-light d-flex flex-column"
        style={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        {page2Components.includes("aboutMe") && (
          <div className="form-group mb-4">
            <h3 className="mb-3">About Me</h3>
            <textarea
              placeholder="Enter Here"
              value={inputAboutMe}
              onChange={(e) => setInputAboutMe(e.target.value)}
              type="text"
              id="about-me-input"
              className="form-control w-100"
              rows="4"
              style={{
                resize: "vertical",
                maxHeight: "180px",
                minHeight: "100px",
                overflowY: "auto",
              }}
            />
          </div>
        )}
        {page2Components.includes("address") && (
          <div className="address-form mb-4">
            <h3 className="mb-3">Address Information</h3>
            <div className="mb-3">
              <label htmlFor="streetAddress" className="form-label"></label>
              <input
                required
                placeholder="Enter Street Address Here"
                type="text"
                id="street-address"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cityAddress" className="form-label"></label>
              <input
                required
                placeholder="Enter City Here"
                type="text"
                id="city"
                value={cityAddress}
                onChange={(e) => setCityAddress(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="stateAddress" className="form-label"></label>
              <input
                required
                placeholder="Enter State Here"
                type="text"
                id="state"
                value={stateAddress}
                onChange={(e) => setStateAddress(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="zipCodeAddress" className="form-label"></label>
              <input
                required
                placeholder="Enter Zip Code Here"
                type="text"
                id="zip-code"
                value={zipCodeAddress}
                onChange={(e) => setZipCodeAddress(e.target.value)}
                className="form-control"
              />
            </div>
          </div>
        )}
        {page2Components.includes("birthday") && (
          <div className="mb-4">
            <h3 htmlFor="birthday-input" className="mb-2">
              Birthday
            </h3>
            <input
              value={inputBirthday}
              onChange={(e) => setInputBirthday(e.target.value)}
              type="date"
              id="birthday-input"
              className="form-control"
            />
          </div>
        )}

        <div className="mt-auto text-center">
          <button type="submit" className="btn btn-primary w-100">
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
};
