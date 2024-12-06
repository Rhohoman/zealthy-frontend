import React, { useState, useEffect } from "react";
import "../styles/pages/Data.css";

const baseUrl = process.env.NODE_ENV === 'development' 
  ? "http://localhost:5000/"
  : "https://zealthy-7851dac922ca.herokuapp.com/";

export const Data = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(baseUrl + "user-data", {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.status === "success") {
        setUserData(data.userData);
      } else {
        setError("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-3" role="alert">
        {error}
      </div>
    );
  }

  if (!userData || userData.length === 0) {
    return (
      <div className="alert alert-info m-3" role="alert">
        No user data available
      </div>
    );
  }

  return (
    <div className="data-container">
      <div className="container mt-5">
        <h2 className="mb-4 text-center">User Data</h2>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>About Me</th>
                <th>Birthday</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <tr key={user.id} className={user.isCurrentUser ? 'table-primary' : ''}>
                  <td>{user.id}</td>
                  <td>
                    {user.email}
                    {user.isCurrentUser && <span className="badge bg-primary ms-2">You</span>}
                  </td>
                  <td>{user.about_me || "N/A"}</td>
                  <td>{formatDate(user.birthday)}</td>
                  <td>
                    {user.street_address ? (
                      <>
                        {user.street_address}<br />
                        {user.city_address}, {user.state_address} {user.zip_code_address}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
