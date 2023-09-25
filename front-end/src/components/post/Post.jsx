import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const PF = "http://localhost:5000/images/";
  return (
    <div className="post">
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
      <div className="postInfo">
        <div className="postCats">
          {/* {post.article_category_id.map((c) => (
            <span className="postCat">{c.category_name}</span>   //c.name
          ))} */}
          <span className="postCat">{post.article_category_id.category_name}</span>
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.published_at).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.summary}</p>
    </div>
  );
}
