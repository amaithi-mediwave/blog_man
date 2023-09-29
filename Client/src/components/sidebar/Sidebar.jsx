import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const [cats, setCats] = useState([]);


  //------------------------------------------------------
  //          GETTING ALL AVAILABLE CATEGORIES
  //------------------------------------------------------
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/articles/category");
      setCats(res.data);
    };
    getCats();
  }, []);

  //------------------------------------------------------

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT</span>
        <img
          src="http://localhost:3000/blog_man.png"
          alt="" width="300" height="300"
        />
        <p>
          Get it written... get it right... get it published...<br />
          Everywhere you want to be!..<br /> Inspiring destinations within your reach.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">

          {cats.map((c) => (
            <Link key={c._id} to={`/cat/${c.category_name}/${c._id}`}  >
              <li className="sidebarListItem">{c.category_name.charAt(0).toUpperCase() + c.category_name.slice(1)}</li>
            </Link>
          )
          )}

        </ul>
      </div>
    </div >
  );
}
