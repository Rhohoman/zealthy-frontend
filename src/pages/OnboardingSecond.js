import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAboutMe, setAddress, setBirthday } from "../rootSlice";
import "../styles/pages/OnboardingSecond.css";

const baseUrl = process.env.NODE_ENV === 'development' 
  ? "http://localhost:5000/"
  : "https://zealthy-7851dac922ca.herokuapp.com/";

export const OnboardingSecond = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const page2Components = useSelector((state) => state.admin.page2Components);

  const [formData, setFormData] = useState({
    aboutMe: "",
    street_address: "",
    city_address: "",
    state_address: "",
    zip_code_address: "",
    birthday: ""
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submissionData = {};
    if (page2Components.includes("aboutMe")) {
      submissionData.aboutMe = formData.aboutMe;
    }
    if (page2Components.includes("address")) {
      submissionData.address = {
        street_address: formData.street_address,
        city_address: formData.city_address,
        state_address: formData.state_address,
        zip_code_address: formData.zip_code_address
      };
    }
    if (page2Components.includes("birthday")) {
      submissionData.birthday = formData.birthday;
    }
    
    try {
      const response = await sendPostRequest(submissionData);
      if (response.status === "success") {
        if (page2Components.includes("aboutMe")) {
          dispatch(setAboutMe(formData.aboutMe));
        }
        if (page2Components.includes("address")) {
          dispatch(setAddress({
            street_address: formData.street_address,
            city_address: formData.city_address,
            state_address: formData.state_address,
            zip_code_address: formData.zip_code_address
          }));
        }
        if (page2Components.includes("birthday")) {
          dispatch(setBirthday(formData.birthday));
        }
        navigate("/onboarding/3");
      } else {
        setError(response.message || "Failed to save information");
      }
    } catch (error) {
      setError("An error occurred while saving your information");
    }
  };

  async function sendPostRequest(data) {
    try {
      const res = await fetch(baseUrl + "second-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const responseData = await res.json();
      console.log("Form submission response:", responseData);
      return responseData;
    } catch (error) {
      console.error("Request failed:", error);
      throw error;
    }
  }

  return (
    <div className="onboarding-second-container d-flex justify-content-center align-items-center vh-100">
      <div className="form-container w-75">
        <form
          onSubmit={handleSubmit}
          className="form-group p-4 border rounded bg-light"
          style={{ maxHeight: "80vh", overflowY: "auto" }}
        >
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {page2Components.includes("aboutMe") && (
            <div className="mb-4">
              <div className="form-group">
                <label htmlFor="aboutMe" className="form-label mb-2 h3">
                  About me
                </label>
                <textarea
                  id="aboutMe"
                  name="aboutMe"
                  required={page2Components.includes("aboutMe")}
                  className="form-control w-100"
                  value={formData.aboutMe}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself"
                  rows="4"
                  style={{ resize: "vertical", minHeight: "120px" }}
                />
              </div>
            </div>
          )}

          {page2Components.includes("address") && (
            <div className="form-group mb-4">
              <h3 className="mb-3">Address Information</h3>
              <div className="mb-3">
                <input
                  placeholder="Enter Street Address Here"
                  type="text"
                  id="street_address"
                  name="street_address"
                  value={formData.street_address}
                  onChange={handleInputChange}
                  className="form-control w-100"
                  required={page2Components.includes("address")}
                />
              </div>
              <div className="mb-3">
                <input
                  placeholder="Enter City Here"
                  type="text"
                  id="city_address"
                  name="city_address"
                  value={formData.city_address}
                  onChange={handleInputChange}
                  className="form-control w-100"
                  required={page2Components.includes("address")}
                />
              </div>
              <div className="mb-3">
                <input
                  placeholder="Enter State Here"
                  type="text"
                  id="state_address"
                  name="state_address"
                  value={formData.state_address}
                  onChange={handleInputChange}
                  className="form-control w-100"
                  required={page2Components.includes("address")}
                />
              </div>
              <div className="mb-3">
                <input
                  placeholder="Enter Zip Code Here"
                  type="text"
                  id="zip_code_address"
                  name="zip_code_address"
                  value={formData.zip_code_address}
                  onChange={handleInputChange}
                  className="form-control w-100"
                  required={page2Components.includes("address")}
                />
              </div>
            </div>
          )}

          {page2Components.includes("birthday") && (
            <div className="mb-4">
              <div className="form-group">
                <label htmlFor="birthday" className="form-label mb-2 h3">
                  Birthday
                </label>
                <input
                  type="date"
                  id="birthday"
                  name="birthday"
                  required={page2Components.includes("birthday")}
                  className="form-control"
                  value={formData.birthday}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}

          <div className="text-center">
            <button type="submit" className="btn btn-primary w-100">
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
