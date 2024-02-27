"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  console.log(data);
  const logout = async () => {
    const response = await axios.get("/api/users/logout");
    console.log("response: ", response);
    console.log("Logout succesfully");
    router.push("/");
  };

  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");
      console.log("response: ", response);
      setData(response.data.user);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    console.log("profile-useEffect called");
    getUserDetails();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] ">
      <h1 className="text-2xl text-center">Profile</h1>
      {/* <p>{`profile ${data._id}`}</p> */}
      {data === "nothing" ? (
        "No data Found"
      ) : (
        <Link
          href={`/profile/${data._id}`}
        >{`Hi ${data.username.toUpperCase()}`}</Link>
      )}
      <button
        type="submit"
        className="mt-3 bg-cyan-400	px-3 py-1 rounded-xl"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
