"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const LeaderboardPage = () => {
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch("/api/leaderboard");
        const data = await response.json();
        setLeaderboardData(data);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Leaderboard</h1>

        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <p className="text-2xl font-semibold text-center">
            Total Users: {leaderboardData?.totalUsers}
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-4 py-2 text-left">Rank</th>
                <th className="px-4 py-2 text-left">User</th>
                <th className="px-4 py-2 text-left">Prompts Created</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData?.topUsers.map((user, index) => (
                <tr key={user._id} className="border-b border-gray-700">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2 flex items-center">
                    <Image
                      src={user.image || "/assets/images/logo.svg"}
                      alt={user.username}
                      width={32}
                      height={32}
                      className="rounded-full mr-2"
                    />
                    <span>{user.displayName || user.username}</span>
                  </td>
                  <td className="px-4 py-2">{user.promptCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
