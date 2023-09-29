import { useEffect, useState } from "react";
// import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import "./categoryfilter.css";
import axios from "axios";

export default function Categoryfilter() {

  const location = useLocation();
  const c_name = location.pathname.split("/")[2];
  const category_id = location.pathname.split("/")[3];
  const category_name = c_name[0].toUpperCase() + c_name.slice(1);

  const [posts, setPosts] = useState([]);


  //------------------------------------------------------
  //          GETTING ARTICLES BASED ON SELECTED CATEGORY
  //------------------------------------------------------
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`/articles/category/${category_id}`);
      setPosts(res.data);
    };
    fetchPosts();
  }, [category_id]);

  //------------------------------------------------------
  //          RETURN BLOCK
  //------------------------------------------------------
  return (
    <>

      <div className="header">
        <div className="headerTitles">
          <span className="headerTitleSm"> Read on your Interest </span>
          <span className="headerTitleLg">{category_name} </span>
        </div>
        <img
          className="headerImg"
          src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt=""
        />
      </div>

      <div className="home">
        <Sidebar />
        <Posts posts={posts} />

      </div>
    </>
  );
}
