import React, { useState } from "react";
import "./Search.css";
import { useNavigate } from "react-router-dom";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
    console.log(e.target.value);
  };
  return (
    <div>
      <form action="" className="searchBox" onSubmit={onSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </div>
  );
};

export default Search;
