"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function VerifyUserEmail() {
  const [token, setToken] = useState("");
  const [verified, setverified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      console.log(response);
      setverified(true);
    } catch (error) {
      setError(true);
      console.log(error.message);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center h-[100vh] justify-center ">
      <h1 className="text-4xl m-2">Verify Email</h1>
      <h2 className="p-2 bg-orange-400 text-black">
        {token ? `${token}` : "No Token"}
      </h2>
      <div>
        {verified && (
          <div>
            <h2 className="m-2">Email verified</h2>
            <Link href="/login">Login</Link>
          </div>
        )}
      </div>
      {error && (
        <div className="text-2xl bg-red-500">
          <h2>Error</h2>
        </div>
      )}
    </div>
  );
}
