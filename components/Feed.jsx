"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { Search, User, Tag } from "lucide-react";

const SearchBar = ({
  searchText,
  handleSearchChange,
  handleSearchSubmit,
  searchType,
  setSearchType,
}) => {
  return (
    <div className="w-full max-w-xl mx-auto mb-12">
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            placeholder={`Search by ${
              searchType === "username"
                ? "username"
                : searchType === "tag"
                ? "tag"
                : "username or tag"
            }...`}
            value={searchText}
            onChange={handleSearchChange}
            className="w-full px-6 py-3 pl-12 rounded-full bg-gray-800 bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all backdrop-blur-sm border border-gray-700"
          />
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </form>

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => setSearchType("all")}
          className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
            searchType === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-800 bg-opacity-50 text-gray-400 hover:bg-opacity-70"
          }`}
        >
          <Search size={16} />
          All
        </button>
        <button
          onClick={() => setSearchType("username")}
          className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
            searchType === "username"
              ? "bg-blue-600 text-white"
              : "bg-gray-800 bg-opacity-50 text-gray-400 hover:bg-opacity-70"
          }`}
        >
          <User size={16} />
          Username
        </button>
        <button
          onClick={() => setSearchType("tag")}
          className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
            searchType === "tag"
              ? "bg-blue-600 text-white"
              : "bg-gray-800 bg-opacity-50 text-gray-400 hover:bg-opacity-70"
          }`}
        >
          <Tag size={16} />
          Tag
        </button>
      </div>
    </div>
  );
};

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = ({ initialPosts = [] }) => {
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [posts, setPosts] = useState(initialPosts);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/prompt");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (initialPosts.length === 0) {
      fetchPosts();
    }
  }, [initialPosts]);

  const performSearch = async (query, type) => {
    if (!query.trim()) {
      setFilteredPosts(posts);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}&type=${type}`
      );
      if (!response.ok) throw new Error("Failed to search posts");
      const data = await response.json();
      setFilteredPosts(data);
    } catch (error) {
      console.error("Error searching:", error);
      setFilteredPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const newSearchText = e.target.value;
    setSearchText(newSearchText);

    if (searchTimeout) clearTimeout(searchTimeout);

    const newTimeout = setTimeout(() => {
      if (!newSearchText.trim()) {
        setFilteredPosts(posts);
      } else {
        performSearch(newSearchText, searchType);
      }
    }, 500);

    setSearchTimeout(newTimeout);
  };

  useEffect(() => {
    if (searchTimeout) clearTimeout(searchTimeout);

    if (searchText.trim()) {
      performSearch(searchText, searchType);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchType]);

  const handleTagClick = (tag) => {
    setSearchText(tag);
    setSearchType("tag");
    performSearch(tag, "tag");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      performSearch(searchText, searchType);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <SearchBar
        searchText={searchText}
        handleSearchChange={handleSearchChange}
        handleSearchSubmit={handleSearchSubmit}
        searchType={searchType}
        setSearchType={setSearchType}
      />

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center text-gray-400 mt-8">
          <p className="text-lg">No prompts found</p>
          <p className="text-sm mt-2">
            {searchType === "username"
              ? "Try searching for a different username"
              : searchType === "tag"
              ? "Try searching for a different tag"
              : "Try searching with different keywords"}
          </p>
        </div>
      ) : (
        <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
