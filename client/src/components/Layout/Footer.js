import React from "react";

const Footer = () => {
  return (
    <footer
      style={{ backgroundColor: "white" }}
    >
      <div
        className="text-center text-black p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.01)" }}
      >
        © Copyright{" "}
        <a className="text-black" href="/expense">
        <strong><span>EXpense</span></strong>
        </a>
        {" "} All Rights Reserved
      </div>
    </footer>
  );
};
export default Footer;
