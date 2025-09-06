import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className=" footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
      <nav className="grid grid-flow-col gap-2">
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
      </nav>

      <nav>
        <div className="grid grid-flow-col gap-4">
          {/* Twitter */}
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 ..."></path>
            </svg>
          </a>
          {/* Facebook */}
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4 ..."></path>
            </svg>
          </a>
        </div>
      </nav>

      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All rights reserved by ACME
          Industries Ltd
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
