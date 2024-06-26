import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import useStore from "../store/store";

const mainUrl = "http://167.99.138.67:1111/";

function EditPost() {
  const { username, secretKey, favorites, setFavorites } = useStore();
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    title: "",
    image: "",
    description: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch(`${mainUrl}getsinglepost/${username}/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data.data));
  }, [id, username]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updateData = {
      secretKey: secretKey,
      ...post,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    };

    fetch(`${mainUrl}updatepost`, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          updateFavorites(post);
          navigate("/");
        } else {
          setErrorMessage("Failed to update post");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage("An error occurred. Please try again.");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const updateFavorites = (updatedPost) => {
    const updatedFavorites = favorites.map((fav) =>
      fav.id === updatedPost.id ? updatedPost : fav
    );
    setFavorites(updatedFavorites);
    localStorage.setItem(
      username + "_favorites",
      JSON.stringify(updatedFavorites)
    );
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <h1>Edit Post</h1>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <Form className="w-50" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            name="image"
            value={post.image}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={post.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Post
        </Button>
      </Form>
    </div>
  );
}

export default EditPost;
