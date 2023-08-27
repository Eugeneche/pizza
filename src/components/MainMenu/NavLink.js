import React from "react"
import { Link } from "gatsby"
import * as styles from "./_MainMenu.module.scss"

/* const linkStyles = {
    color: "#1d1d1d",
    textDecoration: "none"
}

const activeStyles = {
    color: "#959494"
} */

const NavLink = ({ children, to }) => (
    <Link to={to} /* style={linkStyles} activeStyle={activeStyles} */ className={styles.linkStyles} activeClassName={styles.activeStyles}>
      {children}
    </Link>
)
  
  export default NavLink