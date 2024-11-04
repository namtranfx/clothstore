import React from "react";
import { DesktopMenu } from "../Menu/Menu";
import { MenuItemType } from "@/lib/interface";

const NavBar = () => {
  const navLinks: MenuItemType[] = [
    {
      id: "link1",
      title: "Man",
      url: "/men-clothing",
    },
    {
      id: "link2",
      title: "Woman",
      url: "/woman-clothing",
    },
    {
      id: "link3",
      title: "Featured",
      url: "/featured",
    },
    {
      id: "link4",
      title: "Admin",
      url: "/admin",
    },
  ];
  return (
    <>
      <nav className="hidden md:grid grid-cols-3 gap-4 items-center">
        <DesktopMenu links={navLinks} />
      </nav>
    </>
  );
};

export default NavBar;
