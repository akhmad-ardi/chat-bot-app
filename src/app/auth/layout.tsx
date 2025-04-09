import React from "react";

export default async function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1>Layout Auth</h1>
      {children}
    </>
  );
}