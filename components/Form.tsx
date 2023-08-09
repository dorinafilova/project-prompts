import Link from "next/link";
import React, { Dispatch, FormEvent, SetStateAction } from "react";

type Props = {
  type: string;
  post: any;
  setPost: Dispatch<
    SetStateAction<{
      prompt: string;
    }>
  >;
  submitting: boolean;
  handleSubmit:(e: FormEvent) => Promise<any>
};

const Form = ({ type, post, setPost, submitting, handleSubmit }: Props) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} a post</span>
      </h1>
      <p className="desc text-left max-w-md">{type} and share promps!</p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-seminbold text-base text-gray-700">
            Your prompt:
          </span>
          <textarea
            value={post.prompt}
            className="form_textarea"
            required
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
          ></textarea>
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            className="px-5 py-1.5 text-sm bg-primary-orange rounder-full text-white"
            type="submit"
            disabled={submitting}
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
