import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAddress, setBirthday, setAboutMe } from "../rootSlice";
import { useSelector } from "react-redux";
import "../styles/pages/OnboardingThird.css";

export const OnboardingThird = () => {
  const baseUrl = "https://zealthy-7851dac922ca.herokuapp.com/";

  const [streetAddress, setStreetAddress] = useState("");
  const [cityAddress, setCityAddress] = useState("");
  const [stateAddress, setStateAddress] = useState("");
  const [zipCodeAddress, setZipCodeAddress] = useState("");

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
      fields.aboutMe = aboutMe;
    }
    if (page3Components.includes("address")) {
      fields.address = {
        streetAddress,
        cityAddress,
        stateAddress,
        zipCodeAddress,
      };
      dispatch(setAddress(fields.address));
    }
    if (page3Components.includes("birthday")) {
      dispatch(setBirthday(birthday));
      fields.birthday = birthday;
    }

    sendPostRequest(fields);

    navigate("/data");
  };

  async function sendPostRequest(fields) {
    try {
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
        className="onboarding-form w-75 p-4 border rounded bg-light"
        style={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        {page3Components.includes("address") && (
          <div className="form-group mb-4">
            <h3 className="mb-3">Address Information</h3>
            <div className="mb-3">
              <label htmlFor="streetAddress" className="form-label"></label>
              <input
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

        {page3Components.includes("birthday") && (
          <div className="form-group mb-4">
            <h3 className="mb-2">Birthday</h3>
            <input
              value={birthday}
              onChange={(e) => setLocalBirthday(e.target.value)}
              type="date"
              id="birthday-input"
              className="form-control"
            />
          </div>
        )}

        {page3Components.includes("aboutMe") && (
          <div className="form-group mb-4">
            <h3 className="mb-2">About Me</h3>
            <textarea
              placeholder="Enter Here"
              id="about-me-input"
              value={aboutMe}
              onChange={(e) => setAboutMeInput(e.target.value)}
              className="form-control w-100"
              rows="4"
              style={{ resize: "vertical", minHeight: "100px" }}
            />
          </div>
        )}

        <div className="text-center">
          <button type="submit" className="btn btn-primary w-100">
            Complete
          </button>
        </div>
      </form>
    </div>
  );
};
