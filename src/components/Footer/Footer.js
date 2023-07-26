import * as React from "react"
import { Link } from "gatsby"

const Footer = () => {
    
    return (
        <footer>
          © {new Date().getFullYear()} &middot; Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
    )
}

export default Footer