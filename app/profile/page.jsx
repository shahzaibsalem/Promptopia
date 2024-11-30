"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@/pages/Profile";

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setposts] = useState([]);
  useEffect(() => {
    const fetchpost = async () => {
      const res = await fetch(`/api/user/${session?.user.id}/posts`);
      const data = await res.json();
      setposts(data);
    };
    if (session?.user.id) fetchpost();
  }, [session?.user?.id]);

  const handleEdit = (post) => {
    router.push(`/update-post?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this post?");
    if (hasConfirmed) {
      try {
        console.log(post._id);
        const response = await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          const filtered = posts.filter((p) => p._id !== post._id);
          setposts(filtered);
        } else {
          console.log("Failed to delete post");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    }
  };

  return (
    <Profile
      name="My Profile"
      desc="Welcome to your Personalized profile"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default Page;
