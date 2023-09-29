import Home from "./pages/homepage/Homepage"
import TopBar from "./components/topbar/Topbar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Userinfo from "./pages/userinfo/Userinfo";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Myposts from "./pages/myposts/Mypost";
import Categoryfilter from "./pages/categoryfilter/Categoryfilter";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import axios from "axios";



function App() {

  const { user } = useContext(Context);

  //------------------------------------------------------
  //          AXIOS GLOBAL DEFAULT CONFIG - URL AND CUSTOM HEADER*
  //------------------------------------------------------
  axios.defaults.baseURL = 'http://localhost:5000/api'
  axios.defaults.headers.common['v2_header'] = 'web';



  //------------------------------------------------------
  //          RETURN BLOCK
  //------------------------------------------------------
  return (
    <Router>
      <TopBar />
      <Switch>

        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/register">{user ? <Home /> : <Register />}</Route>
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/my-posts">{user ? <Myposts /> : <Login />}</Route>
        <Route path="/write">{user ? <Write /> : <Register />}</Route>
        <Route path="/user-info">{user ? <Userinfo /> : <Register />}</Route>
        <Route path="/post/:postId">{user ? <Single /> : <Login />}</Route>
        <Route path="/cat/:c_name/:c_id"><Categoryfilter /></Route>

      </Switch>
    </Router>
  );
}

export default App;
