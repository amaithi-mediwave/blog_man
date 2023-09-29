import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import Select from 'react-select';
import "./singlePost.css";
import Comments from "../commentbar/comments/Comments";



export default function SinglePost() {

  const PF = "http://localhost:5000/images/";
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const { user } = useContext(Context);

  const [post, setPost] = useState({});

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [desc, setDesc] = useState("");
  const [summary, setSummary] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const [cats, setCats] = useState([]);
  const [category, setCategory] = useState("");
  const [visibility, setVisibility] = useState("");



  //------------------------------------------------------
  //          GETTING ARTICLES FROM DATABASE (Where Visibility is true)
  //------------------------------------------------------
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/articles/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.blog_data);
      setAuthor(res.data.user_id);
      setSummary(res.data.summary)
    };
    getPost();
  }, [path]);


  //------------------------------------------------------
  //          GETTING AVAILABLE CATEGORIES
  //------------------------------------------------------
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/articles/category");
      setCats(res.data);
    };
    getCats();
  }, []);

  //------------------------------------------------------
  //          Maping Values for Category Selector for Edit
  //------------------------------------------------------
  const options = cats.map(d => ({
    "value": d._id,
    "label": d.category_name
  }))

  //------------------------------------------------------
  //          Maping Values for Publish Selector for Edit
  //------------------------------------------------------
  const publish = [
    { value: 'true', label: 'Publish' },
    { value: 'false', label: "Draft" },
  ]

  //------------------------------------------------------
  //          Handle CategoryChange, PublishChange 
  //------------------------------------------------------
  const handleCategoryChange = (selectedOption) => {
    setCategory(selectedOption);
  };

  const handlePublishChange = (selectedOption) => {
    setVisibility(selectedOption);
  };


  //------------------------------------------------------
  //          HandleCancel, HandleDelete, HandleUpdate
  //------------------------------------------------------
  const handleCancel = () => {
    if (window.confirm("Are you Sure to cancel the update..! all your un-updated content will be lost..")) {
      window.location.reload(false);
    };
  }

  const handleDelete = async () => {
    try {
      if (window.confirm("Are You Sure to Delete the Article..?")) {
        const res = await axios.delete(`/articles/user/${post._id}`);
        window.alert("Article has been deleted Successfully, you'll be redirected Home.")
        res.data && window.location.replace("/");
      }
    }
    catch (err) { }
  };

  const handleUpdate = async () => {
    try {
     
      await axios.put(`/articles/user/${post._id}`, {
        title,
        summary,
        blog_data: desc,
        article_category: category.value,
        visibility: visibility.value
      });
      window.alert("Article has been Updated Successfully, you'll be redirected to the Article.")
      setUpdateMode(false)
    } catch (err) { }
  };


  //------------------------------------------------------
  //          RETURN BLOCK
  //------------------------------------------------------


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
                > Edit </i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                > Delete</i>
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

