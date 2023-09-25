import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Settings() {
  const [file, setFile] = useState(null);
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [profession, setProfession] = useState("");
  const [interests, setInterests] = useState("");
  const [about, setAbout] = useState("");
  const [info, setInfo] = useState("");
  // const [username, setUsername] = useState("");

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);

  const PF = "http://localhost:5000/images/"

  console.log(user);


  const [dobDate, setDobDate] = useState(new Date());

  useEffect(() => {
    const getInfo = async () => {
      const res = await axios.get(`/users/userinfo/${user._id}`);
      setInfo(res.data);
      // setTitle(res.data.title);
      // setDesc(res.data.blog_data);
      console.log(info);
    };
    getInfo();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      user_id: user._id,
      first_name,
      last_name,
      dob: dobDate,
      profession,
      interests,
      about
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      // updatedUser.profile_pic = filename;
      updatedUser.profile_pic = filename;
      try {
        await axios.post(`/upload/${user._id}`, data);
      } catch (err) { }
    }
    try {
      const res = await axios.post("/users/userinfo/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF + user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>First Name</label>
          <input
            type="text"
            // placeholder= "amaithi"
            defaultValue={info.first_name}
            // value="Amaithi"

            onChange={(e) => setFirstname(e.target.value)}
          />
          <label>Last Name</label>
          <input
            type="text"
            // placeholder={first_name}
            defaultValue={info.last_name}
            onChange={(e) => setLastname(e.target.value)}
          />
          <label>Date of Birth</label>
          <DatePicker
            showIcon
            selected={dobDate}
            defaultValue={info.dob}
            onChange={(date) => setDobDate(date)}
          />


          <label>Profession</label>
          <input
            type="text"
            // placeholder={first_name}
            defaultValue={info.profession}
            onChange={(e) => setProfession(e.target.value)}
          />
          <label>Interests</label>
          <input
            type="text"
            // placeholder={first_name}
            defaultValue={info.interests}
            onChange={(e) => setInterests(e.target.value)}
          />
          <label>About</label>
          <input
            type="text"
            // placeholder={first_name}
            defaultValue={info.about}
            onChange={(e) => setAbout(e.target.value)}
          />
          {/* <label>Email</label>
          <input
            type="email"
            // placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          /> */}
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
