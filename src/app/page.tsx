"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type User = {
  username: string;
  email: string;
};
export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User>();
  console.log(user);

  useEffect(() => {
    const controller = new AbortController();
    try {
      (async function () {
        const response = await (
          await fetch("http://localhost:3000/api/user/me", {
            method: "GET",
            signal: controller.signal,
          })
        ).json();
        setUser(response?.data);
      })();
    } catch (error) {
      console.log(error);
    }

    return () => {
      controller.abort();
    };
  }, []);

  async function handleLogout() {
    try {
      const response = await (
        await fetch("http://localhost:3000/api/user/logout")
      ).json();
      if (response.success) {
        router.push("/");
        toast.success(response.message);
        return;
      }
      toast.error(response.error);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong, please retry");
    }
  }
  return (
    <nav className="container grid grid-cols-12 items-center h-14 bg-slate-900 top-0 left-0 right-0 px-4 py-2">
      <div className="col-span-4 font-bold text-2xl">
        <Link href={"/"}>LOGO</Link>
      </div>
      <div className="col-span-8 flex justify-end space-x-4">
        <Link href={"/profile"} className="text-white font-semibold py-1">
          {user?.username}
        </Link>
        <button
          className="bg-red-700 text-white rounded-sm px-1 py-1 hover:bg-red-400"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
