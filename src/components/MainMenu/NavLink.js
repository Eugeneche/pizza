import React from "react"
import { Link } from "gatsby"

const linkStyles = {
    color: "#1d1d1d",
    textDecoration: "none"
}

const activeStyles = {
    color: "#959494"
}

const NavLink = ({ children, to }) => (
    <Link to={to} style={linkStyles} activeStyle={activeStyles}>
      {children}
    </Link>
)
  
  export default NavLink