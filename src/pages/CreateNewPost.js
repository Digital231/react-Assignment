import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useStore from "../store/store";

const mainUrl = "http://167.99.138.67:1111/";

function CreateNewPost() {
  const { secretKey } = useStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch(mainUrl + "createpost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secretKey: secretKey,
        title: title,
        image: image,
        description: description,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) {
          alert(data.message);
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
      });
  }

  return (
    <div className="d-flex justify-content-center">
      <Form className="w-50">
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Type title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPasswordOne">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Type description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPasswordTwo">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Type image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Group>

        <Button onClick={handleSubmit} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default CreateNewPost;

// /createpost
// body keys: secretKey, title, image, description
