"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function OwnerSignup() {
  const [gymName, setGymName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    setMessage("Creating account...");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    const userId = data.user?.id;
    console.log("USER ID:", userId);
    console.log("User ID:", userId);
    console.log("Auth Data:", data);

    const { error: gymError } = await supabase.from("gyms").insert({
      name: gymName,
      email,
      phone,
      owner_id: userId,
    });

    if (gymError) {
  console.log("GYM ERROR:", gymError);
  setMessage(JSON.stringify(gymError));
  return;
}
   setMessage("Account created successfully");
  }

  return (
    <main style={{ maxWidth: 500, margin: "50px auto" }}>
      <h1>Create Gym Account</h1>

      <form onSubmit={handleSignup}>
        <input
          placeholder="Gym Name"
          value={gymName}
          onChange={(e) => setGymName(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button type="submit">
          Create Account
        </button>
      </form>

      <p>{message}</p>
    </main>
  );
}