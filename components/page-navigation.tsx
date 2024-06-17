"use client";

import React, { useState } from "react";

import { Navbar, Sidebar } from ".";

export const PageNavigation = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <Sidebar {...{ toggle, setToggle }} />
      <Navbar {...{ setToggle }} />
    </>
  );
};
