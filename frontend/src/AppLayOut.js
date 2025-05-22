import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import NoMatch from "./pages/NoMatch";
import Posts from "./pages/Posts";
import PostLists from "./pages/PostLists";
import Post from "./pages/Post";
import Login from "./Login";
import Stats from "./Stats";
import NewPost from "./pages/NewPost";
import ChangePassword from "./pages/ChangePassword"; // Import từ file .js
import ProtectedRoute from "./pages/ProtectedRoute";
import Register from "./Register";

export default function AppLayOut() {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  function logOut() {
    setUser(null);
    navigate("/");
  }

  return (
    <>
      <nav style={{ margin: 10 }}>
        <Link to="/" style={{ padding: 5 }}>
          Home
        </Link>
        <Link to="/posts" style={{ padding: 5 }}>
          Posts
        </Link>
        <Link to="/about" style={{ padding: 5 }}>
          About
        </Link>
        <span> | </span>
        {user && (
          <Link to="/stats" style={{ padding: 5 }}>
            Stats
          </Link>
        )}
        {!user && (
          <>
            <Link to="/login" style={{ padding: 5 }}>
              Login
            </Link>
            <Link to="/register" style={{ padding: 5 }}>
              Register
            </Link>
          </>
        )}
        {user && (
          <>
            <Link to="/newpost" style={{ padding: 5 }}>
              AddPost
            </Link>
            <Link to="/changepassword" style={{ padding: 5 }}>
              ChangePassword
            </Link>
            <span onClick={logOut} style={{ padding: 5, cursor: "pointer" }}>
              Logout
            </span>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />}>
          <Route index element={<PostLists />} />
          <Route path=":slug" element={<Post />} />
        </Route>
        <Route
          path="/newpost"
          element={
            <ProtectedRoute user={user}>
              <NewPost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/changepassword"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword user={user} />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/stats"
          element={
            <ProtectedRoute user={user}>
              <Stats />
            </ProtectedRoute>
          }
         /> 
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}