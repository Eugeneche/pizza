import * as React from "react"
import { Link } from "gatsby"
import * as styles from "./_Footer.module.scss"
import logo from "../../images/gatsby-icon.png"
import fb from "../../images/fb_mc.svg"
import twitter from "../../images/twitter_mc.svg"
import insta from "../../images/instagram_mc.svg"

const Footer = () => {
    
    return (
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.logo}>
            <Link to="/"><img src={logo} alt="logo"></img></Link>
          </div>
          <div className={styles.address}>
            <h4>address</h4>
            <span>168 North Ave,</span>
            <span>Hillside,</span>
            <span>NJ 07205, USA</span>
            <span><a href="tel:+123456789">+123 456 789</a></span>
            <span><a href="mailto:info@fauget.com">info@fauget.com</a></span>
          </div>
          <div className={styles.links}>
            <h4>Links</h4>
            <Link to="/">Home</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/contacts">Contacts</Link>
            <Link to="/cart">Cart</Link>
          </div>
          <div className={styles.socials}>
            <h4>join us</h4>
            <a href="https://www.facebook.com/"><img src={fb} alt="facebook icon"></img></a>
            <a href="https://twitter.com/home"><img src={twitter} alt="twitter icon"></img></a>
            <a href="https://www.instagram.com/"><img src={insta} alt="instagram icon"></img></a>
          </div>
          <div className={styles.rights}>
            Fauget Pizzeria © {new Date().getFullYear()} All rights reserved
          </div>

        </div>
      </footer>
    )
}

export default Footer