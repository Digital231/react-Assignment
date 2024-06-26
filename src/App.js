import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";
import Favorites from "./pages/Favorites";
import EditPost from "./pages/EditPost";
import Toolbar from "./components/Toolbar";
import CreateNewPost from "./pages/CreateNewPost";
import useStore from "./store/store";

function App() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);

  return (
    <div>
      <BrowserRouter>
        <Toolbar />
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/create-new-post" element={<CreateNewPost />} />
              <Route
                path="/getsinglepost/:username/:id"
                element={<SinglePost />}
              />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/editpost/:id" element={<EditPost />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
