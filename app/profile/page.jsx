"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@/pages/Profile";

const Page = () => {
  const { data: session } = useSession();

  const handleEdit = () => {};
  const handleDelete = () => {};

  const [posts, setposts] = useState([]);

  useEffect(() => {
    const fetchpost = async () => {
      const res = await fetch(`/api/user/${session?.user.id}/posts`);
      const data = await res.json();
      setposts(data);
    };
    if (session?.user.id) fetchpost();
  }, [session?.user?.id]);
  
  return (
    <Profile
      name="My Profile"
      desc="Welcome to your profile"
      data={posts}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
};

export default Page;
