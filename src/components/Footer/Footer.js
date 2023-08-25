import * as React from "react"
//import { Link } from "gatsby"
import * as styles from "./_Footer.module.scss"

const Footer = () => {
    
    return (
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
        © {new Date().getFullYear()}
        </div>
      </footer>
    )
}

export default Footer