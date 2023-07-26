/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
//import { useStaticQuery, graphql } from "gatsby"

//import Header from "./header"
import "./layout.css"
import MainMenu from "./MainMenu/MainMenu"
import Footer from "./Footer/Footer"

const Layout = ({ children }) => {


  return (
    <div className="global-wrapper">
      <MainMenu />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
