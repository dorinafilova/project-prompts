"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
import React from "react";

type Props = {};

const ProfilePage = (props: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  const id = session?.user?.id;

  const handleDelete = async ({ _id }) => {
    const hasUserConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasUserConfirmed) {
      try {
        await fetch(`/api/prompt/${_id}`, { method: "DELETE" });

        const filteredPosts = posts?.filter((post) => post._id !== _id);
        setPosts(filteredPosts);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleEdit = ({ _id }) => {
    router.push(`/edit-prompt?id=${_id}`);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      if (id) {
        const response = await fetch(`/api/users/${id}/posts`);
        const data = await response.json();
        setPosts(data);
      }
    };

    fetchPosts();
  }, [id]);

  return (
    <Profile
      name="My"
      desc="Welcome to my profile"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
