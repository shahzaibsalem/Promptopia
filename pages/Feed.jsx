"use client";
import { useState, useEffect } from "react";
import Prompcard from "./Prompcard";

const PromptCardList = ({ data, handleTagClick }) => {
  if (!data) {
    return (
      <div>
        <h1 className="head_text  text-left">
          <span className="blue_gradient">Loading...</span>
        </h1>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap gap-6 mt-10">
      {data.map((post) => (
        <Prompcard
          key={post._id}
          post={post}
          handleTagClick={() => handleTagClick(post.tag)}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchtext, setsearchtext] = useState("");
  const [filtered, setfiltered] = useState([]);
  const [posts, setposts] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchValue = e.target.value.toLowerCase();
    setsearchtext(searchValue);

    if (searchValue === "") {
      setfiltered(posts);
    } else {
      const filtered_posts = posts.filter(
        (p) =>
          p.post.toLowerCase().includes(searchValue) ||
          p.tag.includes(searchValue) ||
          p.creator.username.toLowerCase().includes(searchValue)
      );
      setfiltered(filtered_posts);
    }
  };

  const handleTagClick = (tag_) => {
    setsearchtext(tag_);
    if (tag_ === "") {
      setfiltered(posts);
    } else {
      const tagsArray = tag_.split(" ").map((tag) => tag.trim().toLowerCase());
      const filtered_posts = posts.filter((p) => {
        return tagsArray.some((tag) => p.tag.toLowerCase().includes(tag));
      });
      setfiltered(filtered_posts);
    }
  };

  useEffect(() => {
    const fetchpost = async () => {
      try {
        const res = await fetch("/api/prompt");
        const data = await res.json();
        if (data) {
          setposts(data);
          setfiltered(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchpost();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          value={searchtext}
          onChange={handleSearch}
          required
          className="search_input peer"
          placeholder="Search directly for prompt , tag or username"
        />
      </form>
      {/* <PromptCardList data={filtered} handleTagClick={handleTagClick} /> */}
      {filtered.length === 0 ? (
        <p>No results found</p>
      ) : (
        <PromptCardList data={filtered} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
