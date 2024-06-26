import { useEffect, useState } from "react";
import useStore from "../store/store.js";
import FormatDate from "../components/FormatDate.js";
import { Button, Pagination } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import Filter from "../components/Filter";

function HomePage() {
  const {
    setAllPosts,
    filteredPosts,
    setFavorites,
    username,
    secretKey,
    favorites,
  } = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);
  const [postsChanged, setPostsChanged] = useState(false);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultImageUrl =
    "https://plaky.com/blog/wp-content/uploads/2023/08/Intro.jpg";

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      setCurrentPage(Number(page));
    }
  }, [searchParams]);

  useEffect(() => {
    fetch("http://167.99.138.67:1111/getallposts")
      .then((response) => response.json())
      .then((data) => setAllPosts(data.data));

    const storedFavorites =
      JSON.parse(localStorage.getItem(username + "_favorites")) || [];
    setFavorites(storedFavorites);
  }, [setAllPosts, postsChanged, username, setFavorites]);

  function getSinglePost(username, id) {
    navigate(`/getsinglepost/${username}/${id}`);
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

      fetch("http://167.99.138.67:1111/deletepost", options)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setPostsChanged((prev) => !prev);
            removeFromFavorites(id);
          } else {
            console.log("Failed to delete post:", data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  function removeFromFavorites(id) {
    const updatedFavorites = favorites.filter((favorite) => favorite.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem(
      username + "_favorites",
      JSON.stringify(updatedFavorites)
    );
  }

  function editPost(id) {
    navigate(`/editpost/${id}`);
  }

  function handleFavorite(post) {
    let updatedFavorites = [...favorites];
    const favoriteIndex = updatedFavorites.findIndex(
      (fav) => fav.id === post.id
    );

    if (favoriteIndex !== -1) {
      updatedFavorites.splice(favoriteIndex, 1);
    } else {
      updatedFavorites.push(post);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem(
      username + "_favorites",
      JSON.stringify(updatedFavorites)
    );
  }

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSearchParams({ page: pageNumber });
  };

  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <Filter />
      <Pagination className="d-flex justify-content-center mt-4">
        {paginationItems}
      </Pagination>
      <div className="container d-flex flex-wrap gap-1">
        {currentPosts.map((post) => (
          <div key={post.id} className="card mb-3 position-relative">
            <div
              className="favorite position-absolute"
              onClick={() => handleFavorite(post)}
            >
              {favorites.some((fav) => fav.id === post.id) ? "❤️" : "🤍"}
            </div>
            <div className="img">
              <img
                onError={(e) => (e.target.src = defaultImageUrl)}
                className="img"
                src={post.image}
                alt=""
              />
            </div>
            <p className="info">
              {post.title.slice(0, 30)}
              {post.title.length > 30 ? "..." : ""}
            </p>
            <span>
              <p>{post.username}</p>
            </span>
            <p className="info">{FormatDate(post.timestamp)}</p>
            <div className="d-flex mb-3">
              <Button
                variant="primary"
                onClick={() => getSinglePost(post.username, post.id)}
              >
                Read Post
              </Button>
              {username === post.username && (
                <Button variant="danger" onClick={() => deletePost(post.id)}>
                  Remove Post
                </Button>
              )}
              {username === post.username && (
                <Button variant="warning" onClick={() => editPost(post.id)}>
                  Update Post
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      <Pagination className="d-flex justify-content-center mt-4">
        {paginationItems}
      </Pagination>
    </div>
  );
}

export default HomePage;
