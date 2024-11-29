"use client";
import React, { useState , useEffect } from "react";
import { useRouter , useSearchParams } from "next/navigation";
import Form from "@/pages/Form";
const UpdatePage = () => {
  const searchParams = useSearchParams()
  const prompt_id = searchParams.get('id')
  const router = useRouter();
  const [submitting, setsubmitting] = useState(false);
  const [post, setpost] = useState({
    prompt: "",
    tag: "",
  });
  
  useEffect(()=>{
    const details = async()=>{
      const res = await fetch(`/api/prompt/${prompt_id}`)
      const data = await res.json()

      setpost({
        prompt : data.post,
        tag : data.tag
      })
    }
    if(prompt_id) details()
  },[prompt_id])

  const Editprompt = async (e) => {
    e.preventDefault();
    setsubmitting(true);

    if(!prompt_id) alert("Unable to edit prompt")

    try {
      const response = await fetch(`/api/prompt/${prompt_id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          post: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
      else{
        console.log("not ok")
      }
    } catch (error) {
      console.log(error);
    } finally {
      setsubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setpost={setpost}
      submitting={submitting}
      handleSubmit={Editprompt}
    />
  );
}

export default UpdatePage