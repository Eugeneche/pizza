import React, { useState, useEffect } from "react"
import { Link/* , graphql, useStaticQuery */ } from "gatsby"
import * as styles from "./_MainMenu.module.scss"
import NavLink from "./NavLink"
//import useLocalStorage from "../../hooks/useLocalStorage"
//import logo from "../../images/logo_black.svg"
import logo from "../../images/gatsby-icon.png"
//import hamburger from "../../images/menu.svg"
import hamburgerStroke from "../../images/menu_stroke.svg"
import close from "../../images/close.svg"
import bag from "../../images/bag-icon_menu.svg"

const MainMenu = () => {

  const [isShow, setIsShow] = useState(false)
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [isFixed, setIsFixed] = useState(false)

  useEffect(() => {
    
    const fixMenu = () => {
      window.scrollY > 200 && setIsFixed(true)
      window.scrollY <= 200 && setIsFixed(false)
    };
    
    window.addEventListener('scroll', fixMenu);

    return () => {
      window.removeEventListener('scroll', fixMenu);
    };
  }, []);

  const styleNormal = {
    position: "absolute",
    transition: "all ease 0.5s",
  }
  
  const styleFixed = {
    position: "fixed",
    background: "#ffa808",
    transition: "all ease 0.5s"
  }

  useEffect(() => {
    window.localStorage.getItem('cart') && setTotalQuantity(Object.values(JSON.parse(window.localStorage.getItem('cart'))).reduce((acc, cur) => acc + cur, 0))
  }, [{}])

  const styleBcShow = {
    left: "10%",
    /* height: "90vh", */
    bottom: "5%",
    right: "10%",
    transition: "all ease 0.5s"
  }

  const styleBcHide = {
    right: "100%",
    bottom: "95%",
    /* height: "0vh", */
    /* transition: "all ease 0.1s" */
  }

  return (
    <>
      <nav className={styles.desktopMenu} style={isFixed ? styleFixed : styleNormal}>
        <div className={styles.desktopMenuContainer}>
          <ul className={styles.pages}>
            <li><NavLink /* className={styles.menuItem} */ to="/">HOME</NavLink></li>
            <li><NavLink /* className={styles.menuItem} */ to="/menu">MENU</NavLink></li>
            <li><NavLink /* className={styles.menuItem} */ to="/contacts">CONTACTS</NavLink></li>
  {/*           <div className={styles.services}>
              services
              <ul className={[styles.servicesCategories, styles.menuItem].join(' ')}>
                {servicesCategories.map(cat => {
                  const url = cat.relativeDirectory.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[" "]/g, "-").toLowerCase()
                  return <li key={cat.relativeDirectory}><Link to={"/"+url}>{cat.relativeDirectory}</Link></li>
                })}
              </ul>
            </div> */}
            {/* <li><NavLink className={styles.menuItem} to="/prices">prices</NavLink></li>
            <li><NavLink className={styles.menuItem} to="/contacts">contacts</NavLink></li> */}
          </ul>
          <Link className={styles.logo} to="/"><img src={logo} alt="logo"></img></Link>
          <ul className={styles.contacts}>
            <li className={styles.cart}>
              <Link to="/cart"><img src={bag} alt="shopping bag icon"></img></Link>
              {totalQuantity ? 
                <div>
                  <span className={styles.cartQuantityBackgroung}></span>
                  <span className={styles.cartQuantity}>{totalQuantity}</span> 
                </div> :

                <div></div>
              }             
           </li>           
          </ul>
        </div>
      </nav>

      <nav className={styles.mobileMenu}>
        <Link to="/"><img className={styles.logoMobile} src={logo} alt="logo"></img></Link>
        <div className={styles.cartMobileMenu}>
          <Link to="/cart"><img className={styles.cartMobile} src={bag} alt="shopping bag icon"></img></Link>
          {totalQuantity ? 
            <div>
              <span className={styles.cartQuantityBackgroung}></span>
              <span className={styles.cartQuantity}>{totalQuantity}</span> 
            </div> :

            <div></div>
          }
        </div>
        <button onClick={() => setIsShow(true)}><img className={styles.hamburger} src={hamburgerStroke} alt="hamburger menu icon"></img></button>
      </nav>
      
      <div className={styles.mobileMenuShadow} style={isShow ? {display: "block"} : {display: "none"}}>        
      </div>

      <nav className={styles.mobileMenuBackground} style={isShow ? styleBcShow : styleBcHide}>
        <button onClick={() => setIsShow(false)}>
          <img className={styles.close} src={close} alt="close menu icon"></img>
        </button>
        <Link onClick={() => setIsShow(false)} className={styles.logo} to="/"><img src={logo} alt="logo"></img></Link>
        <div className={styles.items}>
          <Link onClick={() => setIsShow(false)} className={styles.item} to="/">HOME</Link>
          <Link onClick={() => setIsShow(false)} className={styles.item} to="/menu">MENU</Link>
          <Link onClick={() => setIsShow(false)} className={styles.item} to="/contacts">CONTACTS</Link>
{/*           <div className={styles.services}>
            
            {servicesCategories.map(cat => {
              const url = cat.relativeDirectory.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[" "]/g, "-").toLowerCase()
              return <Link onClick={() => setIsShow(false)} key={cat.relativeDirectory} className={styles.subItem} to={"/"+url}>
                  {cat.relativeDirectory}
                </Link>
            })}
            
          </div> */}
          {/* <Link onClick={() => setIsShow(false)} className={styles.item} to="/prices">prices</Link>
          <Link onClick={() => setIsShow(false)} className={styles.item} to="/contacts">contacts</Link> */}
        </div>         
      </nav>

    </>
  )
}

export default MainMenu