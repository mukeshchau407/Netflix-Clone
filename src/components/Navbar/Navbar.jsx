import React, { useEffect, useRef } from "react";
import "./Navbar.css";
import logo1 from "../../assets/logo1.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_icon from "../../assets/caret_icon.svg";
import { logout } from "../../firebase-config";

const Navbar = () => {
  const navRef = useRef();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add("nav-dark");
      } else {
        navRef.current.classList.remove("nav-dark");
      }
    });
  });

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img src={logo1} alt="" />

        <ul>
          <li>
            <a href="#" active>
              Home
            </a>
          </li>
          <li>
            <a href="">TV Shows</a>
          </li>
          <li>
            <a href="">Movies</a>
          </li>
          <li>
            <a href="">News & Popular</a>
          </li>
          <li>
            <a href="">My List</a>
          </li>
          <li>
            <a href="">Browse by Languages</a>
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        {/* <div className="search-bar">
        <input type="search" placeholder="Type to search"/> */}
        <img src={search_icon} alt="" className="icons search-icon" />
        {/* </div> */}
        <p>Children</p>
        <img src={bell_icon} alt="" className="icons" />

        <div className="navbar-profile">
          <img src={profile_img} alt="" className="profile" />
          <img src={caret_icon} alt="" />
          <div className="dropdown">
            <p
              onClick={() => {
                logout();
              }}
            >
              Sign out of Netflix
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
