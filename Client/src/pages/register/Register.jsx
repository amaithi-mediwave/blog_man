import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";


export default function Register() {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState(false);
  // const [errorDetail, setErrorDetail] = useState('');

  //------------------------------------------------------
  //          REGISTER FORM SUBMISSION HANDLER
  //------------------------------------------------------
  const handleSubmit = async (e) => {

    e.preventDefault();
    // setError(false);
    try {
      const res = await axios.post("/users/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");

    } catch (err) {

      let message = JSON.stringify(err.response.data.message);
      let new_m = message.replaceAll('-', '\n').replace(/\\|"|ValidationError:/gi, " ");

      window.alert(new_m);
      // setErrorDetail(JSON.stringify(err.response.data.message));
      // setError(true);
    }
  };

  //------------------------------------------------------
  //          RETURN BLOCK
  //------------------------------------------------------  
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="registerInput"
          placeholder="Enter your username..."
          minLength={5}
          maxLength={30}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          className="registerInput"
          placeholder="Enter your email..."
          minLength={5}
          maxLength={25}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          className="registerInput"
          placeholder="Enter your password..."
          minLength={8}
          maxLength={20}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      {/* {error && <span style={{ color: "red", marginTop: "10px" }}>{errorDetail}</span>} */}
    </div>
  );
}
