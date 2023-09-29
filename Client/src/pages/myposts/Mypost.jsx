import { useEffect, useState, useContext } from "react";
// import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
// import Sidebar from "../../components/sidebar/Sidebar";
import "./myposts.css";
import axios from "axios";
import { Context } from "../../context/Context";


export default function Myposts() {

  const { user } = useContext(Context);
  const [posts, setPosts] = useState([]);

  //------------------------------------------------------
  //          GETTING USER ARTICLES - BOTH PUBLISHED AND DRAFT
  //------------------------------------------------------
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/articles/user-all/" + user._id);
      setPosts(res.data);
    };
    fetchPosts();
  }, [user._id]);

  //------------------------------------------------------
  //          RETURN BLOCK
  //------------------------------------------------------
  return (
    <>
      {/* <Header /> */}
      <div className="header">
        <div className="headerTitles">
          <span className="headerTitleSm">Personal Posts </span>
          {/* <span className="headerTitleLg">Blog Man</span> */}
        </div>
        <img
          className="headerImg"
          src="https://images.pexels.com/photos/1995842/pexels-photo-1995842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
      </div>
      <div className="mypost">
        <Posts posts={posts} />
        {/* <Sidebar /> */}
      </div>
    </>
  );
}
