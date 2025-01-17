import Navbar from "@components/Navbar";
import Provider from "@components/Provider";
import dynamic from "next/dynamic";
import "@styles/globals.css";

const ProfileCompletionCheck = dynamic(
  () => import("@components/ProfileCompletionCheck"),
  { ssr: false }
);

export const metadata = {
  title: "GPTDeck",
  description: "Share your prompts",
  icons: {
    icon: "/assets/images/gptdeckxyz.jpg",
    apple: "/assets/images/gptdeckxyz.jpg",
  },
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="overflow-x-hidden bg-gray-800">
        <Provider>
          <div className="">
            <div className="" />
          </div>

          <main className="">
            <Navbar />
            <ProfileCompletionCheck>{children}</ProfileCompletionCheck>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
