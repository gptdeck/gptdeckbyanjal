import Feed from "@components/Feed";
import Hero from "@components/Hero";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

async function fetchPosts() {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/prompt`, {
      next: { revalidate: 0 },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function Home() {
  const initialPosts = await fetchPosts();

  return (
    <>
      <Hero />
      <Feed initialPosts={initialPosts} />
    </>
  );
}
