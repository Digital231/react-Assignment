import React, { useEffect } from "react";
import useStore from "../store/store.js";
import { useNavigate } from "react-router-dom";

function Favorites() {
  const { favorites, setFavorites, username } = useStore();
  const navigate = useNavigate();
  const defaultImageUrl =
    "https://plaky.com/blog/wp-content/uploads/2023/08/Intro.jpg";

  useEffect(() => {
    const storedFavorites =
      JSON.parse(localStorage.getItem(username + "_favorites")) || [];
    setFavorites(storedFavorites);
  }, [username, setFavorites]);

  function removeFromFavorites(id) {
    const updatedFavorites = favorites.filter((favorite) => favorite.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem(
      username + "_favorites",
      JSON.stringify(updatedFavorites)
    );
  }

  function getSinglePost(username, id) {
    navigate(`/getsinglepost/${username}/${id}`);
  }

  if (favorites.length === 0) {
    return <div className="text-center">No favorites yet.</div>;
  }

  return (
    <div className="container">
      <h1 className="text-center">Favorites ({favorites.length})</h1>
      <div className="d-flex flex-wrap">
        {favorites.map((favorite) => (
          <div
            key={favorite.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              margin: "10px",
              width: "300px",
              overflow: "hidden",
            }}
          >
            <div
              onClick={() => removeFromFavorites(favorite.id)}
              style={{ float: "right", fontSize: "30px", cursor: "pointer" }}
            >
              ⭐
            </div>
            <img
              onClick={() => getSinglePost(favorite.username, favorite.id)}
              style={{ width: "200px", cursor: "pointer" }}
              src={favorite.image}
              alt={favorite.title}
              onError={(e) => (e.target.src = defaultImageUrl)}
            />
            <h3>{favorite.title}</h3>
            <p>{favorite.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
