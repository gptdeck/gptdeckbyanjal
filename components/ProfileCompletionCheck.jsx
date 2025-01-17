"use client";

import { useSession } from "next-auth/react";
import ProfileCompletion from "./ProfileCompletionForm";

const ProfileCompletionCheck = ({ children }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (session && (!session.user.username || !session.user.displayName)) {
    return <ProfileCompletion />;
  }

  return children;
};

export default ProfileCompletionCheck;
