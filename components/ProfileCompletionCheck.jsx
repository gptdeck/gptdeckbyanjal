"use client";

import { useSession } from "next-auth/react";
import ProfileCompletion from "./ProfileCompletionForm";

const ProfileCompletionCheck = ({ children }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session && (!session.user.username || !session.user.displayName)) {
    return <ProfileCompletion />;
  }

  return children;
};

export default ProfileCompletionCheck;
