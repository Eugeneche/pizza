import React, { useEffect, useState } from "react"
//import { graphql } from "gatsby"
//import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../styles/_menu.module.scss"


const Contacts = () => {

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.h1}>Contacts</h1>
        
      </div>  
    </Layout>
  )
}

export const Head = () => <Seo title="Contacts | Pizzeria" />

export default Contacts