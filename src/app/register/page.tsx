"use client";

import React from "react";
import Link from "next/link";

function Home() {
  return (
    <div>
      <title>Home • Arvon</title>
      <h1>Welcome to the Homepage</h1>
      
      {}
      <Link href="/login">
        <button>Go to Login</button>
      </Link>
    </div>
  );
}

export default Home;1