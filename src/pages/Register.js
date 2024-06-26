import { useState } from "react";
import useStore from "../store/store.js";
import { useNavigate } from "react-router-dom";

const mainUrl = "http://167.99.138.67:1111/";

function Register() {
  const { username, setUsername } = useStore();
  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name: username,
      passwordOne,
      passwordTwo,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    fetch(mainUrl + "createaccount", options)
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          setErrorMessage(data.message);
        } else {
          setUsername(username);
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage("An error occurred. Please try again.");
      });
  };

  return (
    <div>
      <div className="login-box">
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              type="text"
              name=""
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required=""
            />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name=""
              value={passwordOne}
              onChange={(e) => setPasswordOne(e.target.value)}
              required=""
            />
            <label>Password</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name=""
              value={passwordTwo}
              onChange={(e) => setPasswordTwo(e.target.value)}
              required=""
            />
            <label>Repeat password</label>
          </div>
          <center>
            <button type="submit" className="register-button">
              REGISTER
              <span></span>
            </button>
          </center>
          {errorMessage && (
            <div
              className="d-flex justify-content-center"
              style={{ color: "red", marginBottom: "10px" }}
            >
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Register;
