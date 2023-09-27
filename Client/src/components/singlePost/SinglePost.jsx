import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom'
import { Context } from "../../context/Context";
import Select from 'react-select';
import "./singlePost.css";
// import CommentSection from "../commentbar/component/CommentSection";
import Comments from "../commentbar/comments/Comments";

export default function SinglePost() {


  const location = useLocation();
  const path = location.pathname.split("/")[2];
  // console.log(path);
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [desc, setDesc] = useState("");
  const [summary, setSummary] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const [cats, setCats] = useState([]);
  const [category, setCategory] = useState("");
  const [visibility, setVisibility] = useState("");




  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("v2/articles/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.blog_data);
      setAuthor(res.data.user_id);
      setSummary(res.data.summary)
      console.log(res);
    };
    getPost();
  }, [path]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("v2/articles/category");
      setCats(res.data);
    };
    getCats();

  }, []);
  const options = cats.map(d => ({
    "value": d._id,
    "label": d.category_name
  }))

  const publish = [
    { value: 'true', label: 'Publish' },
    { value: 'false', label: "Draft" },
  ]

  const handleCategoryChange = (selectedOption) => {
    setCategory(selectedOption);
  };

  const handlePublishChange = (selectedOption) => {
    setVisibility(selectedOption);
  }



  const handleCancel = () => {
    window.location.reload(false);
  }




  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/v2/articles/${post._id}`);
      res.data && window.location.replace("/");
    }
    catch (err) { }
  };



  const handleUpdate = async () => {
    try {
      await axios.put(`/v2/articles/${post._id}`, {
        title,
        summary,
        blog_data: desc,
        article_category: category.value,
        visibility: visibility.value
      });
      setUpdateMode(false)
    } catch (err) { }
  };


  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <br>
            {/* <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          /> */}
          </br>
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {author.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${author._id}`} className="link">
              <b> {author.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.updated_at).toDateString()}
          </span>
        </div>
        {updateMode ? (



          <>
            <div className="writeFormGroup">

              <input
                type="text"
                value={title}
                className="writeInput"
                autoFocus={true}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div className="writeFormGroup">
              <textarea
                value={summary}
                type="text"
                className="writeInput writeText1"
                onChange={e => setSummary(e.target.value)}
              ></textarea>
            </div>
            <div className="writeFormGroup">

              <Select options={options}
                name="category"
                placeholder="Select Article Category"
                className="writeInput writeText11"
                onChange={handleCategoryChange} autoFocus={true}
              // onChange={e => setCategory(e.target.value)}
              />
            </div>

            <div className="writeFormGroup">
              <Select options={publish}
                name="visibility"
                placeholder="Would you like to publish.?"
                className="writeInput writeText11"
                onChange={handlePublishChange} autoFocus={true}
              />
            </div>

            <div className="writeFormGroup">
              <textarea
                value={desc}
                type="text"
                className="writeInput writeText2"
                onChange={e => setDesc(e.target.value)}
              ></textarea>
            </div>
          </>




        ) : (
          <div>
            <p className="singlePostSummary">{summary}</p>
            <br />
            <p className="singlePostDesc">{desc}</p>

            <br />
            <Comments />
          </div>
        )}
        {updateMode && (
          <div className="Buttons">
            <button className="singlePostButton" onClick={handleCancel}>
              Cancel
            </button>
            <button className="singlePostButton" onClick={handleUpdate}>
              Update
            </button>
          </div>
        )
        }

      </div>
    </div>
  );
}



{/* <>
          <textarea
            className="singlePostSummaryInput"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <br/>
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          </> */}