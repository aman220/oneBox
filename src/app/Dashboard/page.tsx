"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; 
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
    }

    const usertoken = localStorage.getItem("token");

    if (!usertoken) {
      router.push("/");
    }
  }, [router]);


  return (
    <>
      <div className="text-center flex-1">
        <div className="w-32 h-32 mx-auto mb-6">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="#3B82F6" />
            <rect
              x="30"
              y="30"
              width="30"
              height="40"
              fill="white"
              transform="rotate(-15 45 50)"
            />
            <rect
              x="40"
              y="20"
              width="30"
              height="40"
              fill="white"
              transform="rotate(15 55 40)"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">
          It's the beginning of a legendary sales pipeline
        </h2>
        <p className="text-gray-400">
          When you have inbound E-mails
          <br />
          you'll see them here
        </p>
      </div>
    </>
  );
}
