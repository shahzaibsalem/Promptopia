import React from "react";
import Link from "next/link";

const Form = ({ type, post, setpost, submitting, handleSubmit }) => {
  return (
    <section className="w-full  max-w-full  flex-start  flex-col">
      <h1 className="head_text  text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompt with the world , and let your
        imagination run wild in AI-Powered platform
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism "
      >
        <label className="font-satoshi font-semibold text-base text-gray-700 ">
          <span>Your AI prompt</span>
          <textarea
            className="form_textarea"
            required
            placeholder="Write your prompt here"
            value={post.prompt}
            onChange={(e) => setpost({ ...post, prompt: e.target.value })}
          ></textarea>
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700 ">
            Tag {` `}
            <span className="font-normal">
              (#webdevolpment , #gamedevolpment , #product etc)
            </span>
          </span>
          <input
            className="form_input"
            required
            placeholder="#tag"
            value={post.tag}
            onChange={(e) => setpost({ ...post, tag: e.target.value })}
          ></input>
        </label>

        <div className="flex-end mx-3 mb-5 gap-8">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="bg-primary-orange rounded-full px-5 py-1.5 text-sm text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};
export default Form;
