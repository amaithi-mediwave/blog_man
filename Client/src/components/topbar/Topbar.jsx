import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";
// import axios from 'axios'


export default function TopBar() {
  // const [profile, setProfile] = useState("");
  const { user, dispatch } = useContext(Context);
  // const PF = "http://localhost:5000/images/"
  // const pf_holder = "https://www.shutterstock.com/image-vector/default-profile-picture-avatar-photo-250nw-1681253560.jpg"
  // console.log(user);
  //   useEffect(() => {
  //     const getInfo = async () => {
  //       let res = await axios.get(`/users/user-info/${user._id}`);
  //       setProfile(res.data.profile_pic);
  //       // setTitle(res.data.title);
  //       // setDesc(res.data.blog_data);
  //       // console.log(info);
  //     };
  //     getInfo();
  //   }, []);
  // console.log(profile);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
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

          {/* <li className="topListItem">
            <Link className="link" to="/">
              Categories
            </Link>
          </li> */}
          <li className="topListItem">
            <Link className="link" to="/write">
              Write
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "Logout"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">

            {/* <img className="topImg" src={PF + user._id} alt={user.first_name} /> */}
            <img className="topImg" src="https://media.istockphoto.com/id/1214428300/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=vftMdLhldDx9houN4V-g3C9k0xl6YeBcoB_Rk6Trce0=" />

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
