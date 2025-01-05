import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className="bg-gray-800 bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-2xl p-6 border border-gray-700 shadow-lg transition-all hover:bg-opacity-40 hover:shadow-xl">
      <div className="flex justify-between items-start gap-5">
        <div className="flex items-center gap-3">
          <Image
            src={post.creator.image}
            alt="user image"
            width={48}
            height={48}
            className="rounded-full object-cover border-2 border-blue-400"
          />
          <div>
            <h3 className="font-semibold text-white text-lg">
              {post.creator.displayName}
            </h3>
            <p className="text-gray-400 text-sm">@{post.creator.username}</p>
          </div>
        </div>
        <button
          className="p-2 rounded-full bg-gray-700 bg-opacity-50 hover:bg-opacity-75 transition-all"
          onClick={handleCopy}
        >
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={16}
            height={16}
            alt="copy button"
          />
        </button>
      </div>
      <p className="my-4 text-lg text-gray-200 leading-relaxed whitespace-pre-line">
        {post.prompt}
      </p>
      <p
        className="text-sm text-blue-400 cursor-pointer hover:text-blue-300 transition-colors inline-block px-3 py-1 rounded-full bg-blue-900 bg-opacity-30"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex justify-end gap-4 border-t border-gray-700 pt-3">
          <button
            className="text-sm text-green-400 cursor-pointer hover:text-green-300 transition-colors px-3 py-1 rounded-full bg-green-900 bg-opacity-30 hover:bg-opacity-50"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="text-sm text-red-400 cursor-pointer hover:text-red-300 transition-colors px-3 py-1 rounded-full bg-red-900 bg-opacity-30 hover:bg-opacity-50"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
