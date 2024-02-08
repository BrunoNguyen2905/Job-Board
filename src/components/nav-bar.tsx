import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { faSquareXmark, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type TNavBarProps = any;

const Navbar: React.FC<TNavBarProps> = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);
  const location = useLocation();
console.log('navitagate', location)
  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: "Home", link: "/", isActive: location.pathname === "/" },
    { id: 2, text: "Jobs", link: "/jobs", isActive: location.pathname === "/jobs" },
    { id: 3, text: "Bookmarks", link: "/bookmarks", isActive: location.pathname === "/bookmarks" },
    // { id: 4, text: "About" },
    // { id: 5, text: "Contact" },
  ];

  return (
    <div className="bg-inherit flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white">
      {/* Logo */}
      <h1 className="w-full text-3xl font-bold text-pink-700 cursor-pointer">
        <Link to="/">Job board App</Link>
      </h1>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex">
        {navItems.map((item) => (
          <li
            key={item.id}
            className={`p-4 hover:text-pink-700 rounded-xl m-2 cursor-pointer duration-300 ${item.isActive ? "text-pink-700": ""}`}
          >
            <Link to={item.link}>{item.text}</Link>
          </li>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? (
          <FontAwesomeIcon icon={faSquareXmark} size={"2x"} />
        ) : (
          <FontAwesomeIcon icon={faBars} size={"2x"} />
        )}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
            : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        {/* Mobile Logo */}
        <h1 className="w-full text-3xl font-bold text-pink-700 m-4">
          Job board App
        </h1>

        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <li
            key={item.id}
            className="p-4 border-b rounded-xl hover:text-pink-700 duration-300 cursor-pointer border-gray-600"
          >
            <Link to={item.link}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
