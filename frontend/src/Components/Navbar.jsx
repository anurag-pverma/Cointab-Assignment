
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
      <div style={{display:"flex"}}>
          <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/login">Login</Link>
        </div>
        <div>
          <Link to="/signup">Signup</Link>
        </div>
      </div>
  );
};

export default Navbar;
