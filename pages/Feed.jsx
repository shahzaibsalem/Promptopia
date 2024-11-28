"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Prompcard from "./Prompcard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="flex flex-wrap gap-6 mt-10">
      {data.map((post) => (
        <Prompcard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const {data : session} = useSession()
  const [searchtext, setsearchtext] = useState("");
  const handleSearch = (e) => {};
  const [posts, setposts] = useState([]);
  useEffect(() => {
    const fetchpost = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setposts(data);
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
          placeholder="Search for tag or usernsmr"
        />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
