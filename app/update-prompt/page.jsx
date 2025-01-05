"use client";

import { Suspense } from "react";
import UpdatePromptForm from "@components/UpdatePromptForm";

const UpdatePromptPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePromptForm />
    </Suspense>
  );
};

export default UpdatePromptPage;
