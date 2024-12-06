import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage2Components, setPage3Components } from "../adminSlice";
import { useState, useEffect } from "react";
import "../styles/pages/Admin.css";

export const Admin = () => {
  const dispatch = useDispatch();
  const page2Components = useSelector((state) => state.admin.page2Components);
  const page3Components = useSelector((state) => state.admin.page3Components);
  const componentArr = ["address", "birthday", "aboutMe"];

  const [localPage2Components, setLocalPage2Components] = useState(page2Components);
  const [localPage3Components, setLocalPage3Components] = useState(page3Components);
  const [error, setError] = useState("");

  useEffect(() => {
    setLocalPage2Components(page2Components);
    setLocalPage3Components(page3Components);
  }, [page2Components, page3Components]);

  const handleCheckboxChange = (page, component) => {
    setError("");
    
    if (page === "page2") {
      const newSelection = localPage2Components.includes(component)
        ? localPage2Components.filter((comp) => comp !== component)
        : [...localPage2Components, component];
        
      if (localPage3Components.includes(component)) {
        setLocalPage3Components(localPage3Components.filter(comp => comp !== component));
      }
      
      setLocalPage2Components(newSelection);
    } else if (page === "page3") {
      const newSelection = localPage3Components.includes(component)
        ? localPage3Components.filter((comp) => comp !== component)
        : [...localPage3Components, component];
        

      if (localPage2Components.includes(component)) {
        setLocalPage2Components(localPage2Components.filter(comp => comp !== component));
      }
      
      setLocalPage3Components(newSelection);
    }
  };

  const validateConfiguration = () => {
    const totalComponents = [...localPage2Components, ...localPage3Components];
    
  
    if (localPage2Components.length === 0 || localPage3Components.length === 0) {
      const message = "Both pages must have at least one component selected";
      setError(message);
      alert(message);
      return false;
    }

 
    const uniqueComponents = new Set(totalComponents);
    if (uniqueComponents.size !== totalComponents.length) {
      const message = "A component cannot be in both pages";
      setError(message);
      alert(message);
      return false;
    }

    const allComponentsUsed = componentArr.every(comp => 
      localPage2Components.includes(comp) || localPage3Components.includes(comp)
    );
    if (!allComponentsUsed) {
      const message = "All components must be assigned to either page 2 or page 3";
      setError(message);
      alert(message);
      return false;
    }

    return true;
  };

  const handleSaveConfiguration = () => {
    console.log("Page 2 Components:", localPage2Components);
    console.log("Page 3 Components:", localPage3Components);

    if (!validateConfiguration()) {
      return;
    }

    dispatch(setPage2Components(localPage2Components));
    dispatch(setPage3Components(localPage3Components));
    setError("");
    alert("Configuration saved successfully!");
  };

  return (
    <div className="admin-container">
      <h3>Admin Configuration</h3>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="admin-form">
        <div className="checkbox-section">
          <h4>Onboarding Page 2</h4>
          <div className="checkboxes">
            {componentArr.map((component) => (
              <label key={`page2-${component}`}>
                <input
                  id={`page-2-${component}`}
                  type="checkbox"
                  checked={localPage2Components.includes(component)}
                  onChange={() => handleCheckboxChange("page2", component)}
                  disabled={localPage3Components.includes(component)}
                />
                {component.charAt(0).toUpperCase() + component.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <div className="checkbox-section">
          <h4>Onboarding Page 3</h4>
          <div className="checkboxes">
            {componentArr.map((component) => (
              <label key={`page3-${component}`}>
                <input
                  id={`page-3-${component}`}
                  type="checkbox"
                  checked={localPage3Components.includes(component)}
                  onChange={() => handleCheckboxChange("page3", component)}
                  disabled={localPage2Components.includes(component)}
                />
                {component.charAt(0).toUpperCase() + component.slice(1)}
              </label>
            ))}
          </div>
        </div>
      </div>
      <button onClick={handleSaveConfiguration} type="button" className="btn btn-primary mt-4">
        Save Configuration
      </button>
    </div>
  );
};
