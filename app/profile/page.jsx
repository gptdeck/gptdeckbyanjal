"use client";

import Profile from "@components/Profile";
import UpdateProfileModal from "@components/UpdateProfileModal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const MyProfile = () => {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (session?.user.id) {
        const response = await fetch(`/api/users/${session.user.id}/posts`);
        const data = await response.json();
        setPosts(data);
      }
    };

    if (session?.user.id) fetchPost();
  }, [session]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const confirmation = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (confirmation) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPost = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPost);
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const handleProfileUpdate = (updatedUser) => {
    update({
      ...session,
      user: {
        ...session.user,
        username: updatedUser.username,
        displayName: updatedUser.displayName,
      },
    });
  };

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <p className="text-white text-xl">
          Please sign in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-24">
      <div className="bg-gray-800 bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-2xl p-8 border border-gray-700 shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
            {session.user.displayName || session.user.name || "User"}'s Profile
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-6">
          Welcome to your personalized profile page
        </p>
        <div className="space-y-2 mb-6">
          <p className="text-white">
            Username:{" "}
            <span className="text-gray-300">
              {session.user.username || "Not set"}
            </span>
          </p>
          <p className="text-white">
            Display Name:{" "}
            <span className="text-gray-300">
              {session.user.displayName || session.user.name || "Not set"}
            </span>
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
        >
          Update Profile
        </button>
      </div>

      <Profile
        name={session.user.displayName || session.user.name || "User"}
        desc="Your created prompts"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      <UpdateProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdate={handleProfileUpdate}
      />
    </section>
  );
};

export default MyProfile;
