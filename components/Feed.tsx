"use client";

import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

type Props = {};

const PromptCardList = ({ data }) => {
  return (
    <div className="mt-16 prompt-layout">
      {data.map((post, index) => (
        <PromptCard key={index} post={post} />
      ))}
    </div>
  );
};

const Feed = (props: Props) => {
  const [searchText, setSearchtext] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearch = (e) => {
    setSearchtext(e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          className="search_input peer"
          type="text"
          value={searchText}
          required
          placeholder="Search for a username"
          onChange={handleSearch}
        />
      </form>
      <PromptCardList data={posts} />
    </section>
  );
};

export default Feed;
