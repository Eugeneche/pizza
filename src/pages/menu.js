import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../styles/_styles.module.scss"


const Menu = ({data}) => {
  //console.log(data)

  const allCategories = []
  data.allContentfulPizza.nodes.forEach(node => {
    allCategories.push(node.category)
  })
  const uniqueCategories = [...new Set(allCategories)]
  console.log(uniqueCategories)
  return (
  <Layout>
    <div className={styles.container}>
      <h1 className={styles.h1}>Menu</h1>
      <div className={styles.menuContainer}>
        <div className={styles.products}>
          {data.allContentfulPizza.nodes.map(node => {
            const image = getImage(node.mainImage)
              return (
                <div key={node.id}>
                  <h1>{node.name}</h1>
                  <GatsbyImage
                    image={image}
                    alt={node.name}
                  />
                </div>
              )           
            }
          )}
        </div>
        <div className={styles.info}>
        
        </div>
      </div>

    </div>  
  </Layout>
)}

export const Head = () => <Seo title="Home" />

export default Menu

export const query = graphql`
  query getAllProducts {
    allContentfulPizza {
      nodes {
        id
        article
        category
        description {
          raw
        }
        mainImage {
          gatsbyImageData
        }
        name
        price
        rating
        weight
      }
    }
  }
`