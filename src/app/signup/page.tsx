"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignUpPage() {
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    console.log("useEffect called...");
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignup = async (e:any) => {
    e.preventDefault();
    console.log(user);
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("signup success: ", response.data);

      setLoading(false);
      toast.success("Signup Successfull");
      router.push("/login");
    } catch (error) {
      console.log("signup failed", error);
      toast.error("signup failed");
      setLoading(false);
    }
    setUser({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] ">
      <h1 className="text-2xl text-center mb-2">
        {loading ? "Loading..." : "Signup"}
      </h1>
      <form className="flex flex-col w-[250px]">
        <label htmlFor="username" className="mb-1">
          username
        </label>
        <input
          className="text-black p-1 mb-6 rounded"
          type="text"
          name=""
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />

        <label htmlFor="email" className="mb-1">
          email
        </label>
        <input
          type="email"
          className="text-black p-1 mb-6 rounded"
          name=""
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <label htmlFor="password" className="mb-1">
          password
        </label>
        <input
          type="password"
          className="text-black p-1 mb-6 rounded"
          name=""
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <button
          type="submit"
          onClick={onSignup}
          className="mb-3"
          disabled={buttonDisabled}
        >
          {buttonDisabled ? "no signup" : "signup"}
        </button>
      </form>
      <Link href="/login">visit login page</Link>
    </div>
  );
}
