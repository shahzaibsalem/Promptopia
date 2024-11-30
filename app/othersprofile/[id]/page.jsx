"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Prompcard from "@/pages/Prompcard";
const Page = () => {
  const [all_posts, setall_posts] = useState([]);
  const { id } = useParams();
  const [name, setname] = useState("");
  useEffect(() => {
    const fetchposts = async () => {
      const response = await fetch(`/api/getspecuserprompt/${id}`);
      const data = await response.json();
      setname(data[0].creator.username);
      setall_posts(data);
    };
    fetchposts();
  });

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name}</span>
      </h1>
      <p className="desc text-left">
        Welcome to {name} profile! Explore their prompts, and creativity.
      </p>

      <div className="flex flex-wrap gap-6 mt-6">
        {all_posts.map((post) => (
          <Prompcard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit(post)}
            handleDelete={() => handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Page;
