import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";


export default function TopBar() {

  const { user, dispatch } = useContext(Context);

  //------------------------------------------------------
  //          Logout handler
  //------------------------------------------------------
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  //------------------------------------------------------
  //         RETURN BLOCK
  //------------------------------------------------------

  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/my-posts">
              My Posts
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              Write
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/conv-summary">
              Conv-summary
            </Link>
          </li>

          <li className="topListItem" onClick={
            () => { if (window.confirm("Are You Sure to Signout..?")) { handleLogout() }; }}>
            {user && "Logout"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/user-info">
          {/* <p>Amaithi</p> */}
            <img className="topImg" src="https://media.istockphoto.com/id/1214428300/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=vftMdLhldDx9houN4V-g3C9k0xl6YeBcoB_Rk6Trce0=" alt="welcome" />
          </Link>

        ) : (

          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                Login
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                Register
              </Link>
            </li>
          </ul>
        )}
        {/* <i className="topSearchIcon fas fa-search"></i> */}
      </div>
    </div>
  );
}
