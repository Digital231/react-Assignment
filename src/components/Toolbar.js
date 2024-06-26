import { Link } from "react-router-dom";
import useStore from "../store/store";

function Toolbar() {
  const { isLoggedIn, username, favorites } = useStore();

  function handleLogout() {
    useStore.setState({ isLoggedIn: false, username: "" });
  }

  return (
    <div className="toolbar d-flex justify-content-between p-3 ">
      {isLoggedIn ? <Link to="/">Home</Link> : ""}
      {isLoggedIn ? (
        <Link to="/create-new-post">Create New Post</Link>
      ) : (
        <Link to="/register">Register</Link>
      )}

      {isLoggedIn ? (
        <Link to="/favorites">
          Favorites <span style={{ color: "red" }}>{favorites.length}</span>
        </Link>
      ) : (
        ""
      )}
      {isLoggedIn ? (
        <Link onClick={handleLogout} to="/login">
          Logout <span style={{ color: "red" }}>{username}</span>
        </Link>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
}

export default Toolbar;
