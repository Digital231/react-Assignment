import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormatDate from "../components/FormatDate";
import useStore from "../store/store";
import { Button } from "react-bootstrap";

const mainUrl = "http://167.99.138.67:1111/";

function SinglePost() {
  const [data, setData] = useState(null);
  const { username, id } = useParams();
  const navigate = useNavigate();
  const defaultImageUrl =
    "https://plaky.com/blog/wp-content/uploads/2023/08/Intro.jpg";
  const {
    username: loggedInUsername,
    secretKey,
    favorites,
    setFavorites,
  } = useStore();

  useEffect(() => {
    fetch(`${mainUrl}getsinglepost/${username}/${id}`)
      .then((response) => response.json())
      .then((data) => setData(data.data));
  }, [username, id]);

  function getUserPosts(username) {
    navigate(`/getuserposts/${username}`);
  }

  function deletePost(id) {
    if (window.confirm("Are you sure you want to delete this post?")) {
      const deleteData = {
        secretKey: secretKey,
        id: id,
      };

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deleteData),
      };

      fetch(`${mainUrl}deletepost`, options)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            removeFromFavorites(id);
            navigate("/favorites");
          } else {
            console.log("Failed to delete post:", data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  function editPost(id) {
    navigate(`/editpost/${id}`);
  }

  function removeFromFavorites(id) {
    const updatedFavorites = favorites.filter((favorite) => favorite.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem(
      loggedInUsername + "_favorites",
      JSON.stringify(updatedFavorites)
    );
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col d-flex flex-column align-items-center justify-content-center">
          <h1>
            Single Post by{" "}
            <span
              onClick={() => getUserPosts(data.username)}
              style={{ color: "red", cursor: "pointer" }}
            >
              {data.username}
            </span>
          </h1>
          <h3>
            <span style={{ fontSize: "30px" }}>
              {FormatDate(data.timestamp)}
            </span>
          </h3>
        </div>
      </div>
      <div className="row d-flex justify-content-between">
        <div className="col">
          <div>
            <img
              style={{ height: "60vh" }}
              src={data.image}
              alt="randomImage"
              onError={(e) => (e.target.src = defaultImageUrl)}
            />
          </div>
        </div>
        <div className="col">
          <h2>{data.title}</h2>
          <p>{data.description}</p>
          {loggedInUsername === data.username && (
            <div className="d-flex mb-3">
              <Button variant="danger" onClick={() => deletePost(data.id)}>
                Remove Post
              </Button>
              <Button variant="warning" onClick={() => editPost(data.id)}>
                Update Post
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
