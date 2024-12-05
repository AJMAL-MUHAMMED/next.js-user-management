"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Page = ({ params }: any) => {
  const router = useRouter();

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
    <div>
      <button
        className="bg-white px-2 py-2 border rounded"
        onClick={() => handleLogout()}
      >
        {params.id}
      </button>
    </div>
  );
};

export default Page;
