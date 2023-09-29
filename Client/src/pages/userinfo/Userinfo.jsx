import "./userinfo.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState, useEffect } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Userinfo() {

  const [file, setFile] = useState(null);
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [profession, setProfession] = useState("");
  const [dobDate, setDobDate] = useState(new Date());
  const [interests, setInterests] = useState("");
  const [about, setAbout] = useState("");
  const [info, setInfo] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);


  //------------------------------------------------------
  //          GETTING LOGGGED-IN USER INFO
  //------------------------------------------------------
  useEffect(() => {
    const getInfo = async () => {
      const res = await axios.get(`/users/userinfo/${user._id}`);
      setInfo(res.data.userInfo);
    };
    getInfo();
  }, [user]);
 
  //------------------------------------------------------
  //          USER-INFO FORM SUBMIT HANDLER
  //------------------------------------------------------
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

    //------------------------------------------------------
    //          CREATE OR UPDATE USER INFO
    //------------------------------------------------------
    try {
      const res = await axios.post("/users/userinfo/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });

    } catch (err) {
      let message = JSON.stringify(err.response.data.message);
      let new_m = message.replaceAll('-', '\n').replace(/\\|"|ValidationError:/gi, " ");

      window.alert(new_m);
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  //------------------------------------------------------
  //          RETURN BLOCK
  //------------------------------------------------------
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          {/* <span className="settingsDeleteTitle">Delete Account</span> */}
        </div>
        {info ? (
          <form className="settingsForm" onSubmit={handleSubmit}>

          <label>First Name</label>
          <input
            type="text"
            defaultValue={info.first_name}
            minLength={3}
            maxLength={10}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <label>Last Name</label>
          <input
            type="text"
            minLength={3}
            maxLength={10}
            defaultValue={info.last_name}
            onChange={(e) => setLastname(e.target.value)}
          />
          <label>Date of Birth (minimum 2003 born)</label>
          <DatePicker
            showIcon
            selected={dobDate}
            defaultValue={info.dob}
            maxDate={new Date("2003, 01, 01")}
            onChange={(date) => setDobDate(date)}
          />


          <label>Profession</label>
          <input
            type="text"
            minLength={3}
            maxLength={20}
            defaultValue={info.profession}
            onChange={(e) => setProfession(e.target.value)}
          />
          <label>Interests</label>
          <input
            type="text"
            minLength={3}
            maxLength={50}
            defaultValue={info.interests}
            onChange={(e) => setInterests(e.target.value)}
          />
          <label>About</label>
          <input
            type="text"
            minLength={3}
            maxLength={500}
            defaultValue={info.about}
            onChange={(e) => setAbout(e.target.value)}
          />

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

        ) : (
        <form className="settingsForm" onSubmit={handleSubmit}>

          <label>First Name</label>
          <input
            type="text"
            minLength={3}
            maxLength={10}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <label>Last Name</label>
          <input
            type="text"
            minLength={3}
            maxLength={10}
            onChange={(e) => setLastname(e.target.value)}
          />
          <label>Date of Birth (minimum 2003 born)</label>
          <DatePicker
            showIcon
            selected={dobDate}
            maxDate={new Date("2003, 01, 01")}
            onChange={(date) => setDobDate(date)}
          />


          <label>Profession</label>
          <input
            type="text"
            minLength={3}
            maxLength={20}
            onChange={(e) => setProfession(e.target.value)}
          />
          <label>Interests</label>
          <input
            type="text"
            minLength={3}
            maxLength={50}
            onChange={(e) => setInterests(e.target.value)}
          />
          <label>About</label>
          <input
            type="text"
            minLength={3}
            maxLength={500}
            onChange={(e) => setAbout(e.target.value)}
          />

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
        )}
      </div>
      <Sidebar />
    </div>
  );
}
