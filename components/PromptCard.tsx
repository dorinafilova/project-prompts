"use client";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
type Props = {};

const PromptCard = ({ post, handleEdit, handleDelete }: Props) => {
  const [copied, setcopied] = useState(false);
  const { data: session } = useSession();

  const handleCopy = () => {
    setcopied(true);
    navigator.clipboard.writeText(post.prompt);

    setTimeout(() => setcopied(false), 2000);
  };

  const pathname = usePathname();

  const imgSource = copied
    ? "/assets/icons/tick.svg"
    : "/assets/icons/copy.svg";
  return (
    <div className="prompt_card mb-2">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 cursor-pointer flex justify-start items-center gap-3">
          <Image
            alt="img"
            src={post.creator.image}
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="font-satoshi font-semibold text-gray-900">
            {post.creator.username}
          </h3>
          <p className="font-inter text-sm text-gray-500">
            {post.creator.email}
          </p>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image alt="img" src={imgSource} width={12} height={12} />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>

      {session?.user.id === post.creator._id && pathname === "/profile" && (
        <>
          <p onClick={handleEdit} className="orange_gradient font-inter text-sm cursor-pointer">Edit post</p>
          <p onClick={handleDelete} className="green_gradient font-inter text-sm cursor-pointer">Delete post</p>
        </>
      )}
    </div>
  );
};

export default PromptCard;
