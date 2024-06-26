import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useStore from "../store/store.js";

function Filter() {
  const { setFilteredPosts, allPosts } = useStore();
  const [searchTitle, setSearchTitle] = useState("");
  const [searchUsername, setSearchUsername] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleFilter = useCallback(() => {
    const filtered = allPosts.filter((post) => {
      const isTitleMatch = post.title
        .toLowerCase()
        .includes(searchTitle.toLowerCase());
      const isUsernameMatch = post.username
        .toLowerCase()
        .includes(searchUsername.toLowerCase());
      const isDateMatch =
        (!startDate || new Date(post.timestamp) >= new Date(startDate)) &&
        (!endDate || new Date(post.timestamp) <= new Date(endDate));
      return isTitleMatch && isUsernameMatch && isDateMatch;
    });
    setFilteredPosts(filtered);

    const params = new URLSearchParams();
    if (searchTitle) params.set("title", searchTitle);
    if (searchUsername) params.set("username", searchUsername);
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);

    navigate({ search: params.toString() });
  }, [
    allPosts,
    searchTitle,
    searchUsername,
    startDate,
    endDate,
    navigate,
    setFilteredPosts,
  ]);

  useEffect(() => {
    const title = searchParams.get("title") || "";
    const username = searchParams.get("username") || "";
    const start = searchParams.get("startDate") || "";
    const end = searchParams.get("endDate") || "";

    setSearchTitle(title);
    setSearchUsername(username);
    setStartDate(start);
    setEndDate(end);
  }, [searchParams]);

  useEffect(() => {
    handleFilter();
  }, [searchTitle, searchUsername, startDate, endDate, handleFilter]);

  return (
    <div className="filter d-flex justify-content-center flex-column">
      <h1>Filter</h1>
      <div>
        <div>
          <input
            type="text"
            placeholder="Search by username"
            value={searchUsername}
            onChange={(e) => setSearchUsername(e.target.value)}
            className="m-2"
          />
          <input
            type="text"
            placeholder="Search by title"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="m-2"
          />
        </div>
        <input
          type="date"
          placeholder="Start date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="m-2"
        />
        <input
          type="date"
          placeholder="End date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="m-2"
        />
      </div>
    </div>
  );
}

export default Filter;
