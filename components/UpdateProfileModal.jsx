"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

const UpdateProfileModal = ({ isOpen, onClose, onUpdate }) => {
  const { data: session, update } = useSession();
  const [username, setUsername] = useState(session?.user?.username || "");
  const [displayName, setDisplayName] = useState(
    session?.user?.displayName || ""
  );
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (username.length < 4) {
      setError("Username must be at least 8 characters long");
      return;
    }

    try {
      const response = await fetch("/api/user/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.id,
          username,
          displayName,
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        await update({
          ...session,
          user: {
            ...session.user,
            username: updatedUser.username,
            displayName: updatedUser.displayName,
          },
        });
        onUpdate(updatedUser);
        onClose();
      } else {
        const data = await response.json();
        setError(data.message || "Failed to update profile");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-2xl p-8 border border-gray-700 shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-white">
          Update Your Profile
        </h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300"
            >
              Username (minimum 4 characters)
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
              required
              minLength={4}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="displayName"
              className="block text-sm font-medium text-gray-300"
            >
              Display Name
            </label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md text-gray-300 hover:text-white focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
