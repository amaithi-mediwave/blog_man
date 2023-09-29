import { useContext, useState, useEffect } from "react";
import "./write.css";
import axios from "axios";
import Select from 'react-select';
import { Context } from "../../context/Context";


export default function Write() {

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [cats, setCats] = useState([]);
  const [category, setCategory] = useState("");
  const [visibility, setVisibility] = useState("");
  const { user } = useContext(Context);

  //------------------------------------------------------
  //          GETTING THE AVAILABLE CATEGORIES
  //------------------------------------------------------
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/articles/category");
      setCats(res.data);
    };
    getCats();
  }, []);

  //------------------------------------------------------
  //          MAPPTING OPTIONS FOR CATEGORY SELECTOR
  //------------------------------------------------------
  const options = cats.map(d => ({
    "value": d._id,
    "label": d.category_name
  }))

  //------------------------------------------------------
  //          MAPPTING OPTIONS FOR PUBISH SELECTOR
  //------------------------------------------------------
  const publish = [
    { value: 'true', label: 'Publish' },
    { value: 'false', label: "Draft" },
  ]

  //------------------------------------------------------
  //          CATEGORY AND PUBLISH SELECTOR HANDLER
  //------------------------------------------------------
  const handleCategoryChange = (selectedOption) => {
    setCategory(selectedOption);
  };

  const handlePublishChange = (selectedOption) => {
    setVisibility(selectedOption);
  }


  //------------------------------------------------------
  //          WRITE FORM SUBMIT HANDLER
  //------------------------------------------------------
  const handleSubmit = async (e) => {

    e.preventDefault();
    const newPost = {
      user_id: user._id,
      title,
      summary,
      blog_data: desc,
      article_category: category.value,
      visibility: visibility.value,
      photo: ''
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;

      try {
        await axios.post("/upload", data);
      } catch (err) { }
    }

    //------------------------------------------------------
    //          CREATE NEW ARTICLE
    //------------------------------------------------------
    try {
      const res = await axios.post("/articles", newPost);
      if (res) { window.alert("Your Article has been created Succesfully and you'll be redirected to the Article.."); }
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      let message = JSON.stringify(err.response.data.message);
      let new_m = message.replaceAll('-', '\n').replace(/\\|"|ValidationError:/gi, " ");

      window.alert(new_m);
    }
  };

  //------------------------------------------------------
  //          RETURN BLOCK
  //------------------------------------------------------
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus">Upload Image</i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Summary about your story..."
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
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText2"
            onChange={e => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
