"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const onLogin = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("response: ", response);
      setLoading(false);
      router.push("/profile");
    } catch (error) {
      console.log("login failed", error);
      toast.error("login failed");
      setLoading(false);
    }
    setUser({
      email: "",
      password: "",
    });
  };
  return (
    <div className="flex flex-col items-center justify-center h-[100vh]">
      <h1 className="text-2xl text-center mb-2">
        {loading ? "Loading..." : "Login"}
      </h1>
      <form className="flex flex-col w-[200px] " onSubmit={onLogin}>
        <label htmlFor="email">email</label>
        <input
          type="email"
          className="text-black p-1 mb-6 rounded"
          name=""
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <label htmlFor="password">password</label>
        <input
          type="password"
          className="text-black p-1 mb-6 rounded"
          name=""
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button type="submit" className="mb-3">
          Login
        </button>
      </form>
      <Link href="/signup">visit signup page</Link>
    </div>
  );
}
