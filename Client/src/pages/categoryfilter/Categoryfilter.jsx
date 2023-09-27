import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import { useLocation } from "react-router";
import "./categoryfilter.css";
import axios from "axios";

export default function Categoryfilter(props) {
  const locatio = useLocation();
  const category_id = locatio.pathname.split("/")[2];
  // const category_id = location.state;
  // console.log(props.location.state);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`v2/articles/category/${category_id}`);
      setPosts(res.data);
    };
    fetchPosts();
  }, [category_id]);


  return (
    <>
      {/* <Header /> */}

      <div className="header">
      <div className="headerTitles">
        {/* <span className="headerTitleSm"> </span> */}
        <span className="headerTitleLg">Category Filter</span>
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
