import * as React from "react"
//import { graphql } from "gatsby"
//import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../styles/_styles.module.scss"


const IndexPage = () => {
  //console.log(data)
  return (
  <Layout>
    <div  className={styles.container}>
      <h1 className={styles.h1}>Welcome!</h1>

    </div>
  </Layout>
)}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage

/* export const query = graphql`
  query getAll {
    allContentfulPizza {
      nodes {
        id
        article
        category
        weight
        price
        name
        description {
          raw
        }
        mainImage {
          gatsbyImageData
        }
      }
    }
  }
` */