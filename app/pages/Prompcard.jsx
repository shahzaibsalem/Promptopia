"use client";

import { useState } from "react";
import Image from "next/image";
import copy from "/app/public/assets/images/copy-48.png";
import tick from "/app/public/assets/images/check-mark-3-48.png";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const Prompcard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.post);
    setTimeout(() => {
      setCopied("");
    }, 4000);
  };

  const imageClick = async (username, id) => {
    router.push(`/othersprofile/${id}`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-5 flex-grow transition-transform transform hover:scale-105 hover:shadow-xl">
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-center gap-3">
          <Image
            className="rounded-full object-cover border-2 border-orange-400 shadow-md cursor-pointer"
            src={post.creator.image}
            alt="user_image"
            width={50}
            height={50}
            onClick={() => imageClick(post.creator.username, post.creator._id)}
          />
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800">
              {post.creator.username}
            </h3>
            <p className="text-sm text-gray-500">{post.creator.email}</p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
        >
          <Image
            width={20}
            height={20}
            src={copied === post.prompt ? tick : copy}
            alt="copy_icon"
          />
        </button>
      </div>

      <p className="mt-4 text-gray-700 text-sm">{post.post}</p>

      <p
        className="mt-4 inline-block text-sm text-white bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-1 rounded-md cursor-pointer hover:opacity-90"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
      {session?.user?.id === post.creator._id && pathname === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="green_gradient text-sm font-inter cursor-pointer"
            onClick={() => handleEdit()}
          >
            Edit
          </p>
          <p
            className="orange_gradient text-sm font-inter cursor-pointer"
            onClick={() => handleDelete()}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};
export default Prompcard;
