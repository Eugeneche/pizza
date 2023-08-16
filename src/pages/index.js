import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../styles/_styles.module.scss"
import Header from "../components/Header/Header"


const IndexPage = ({data}) => {
  
  const hotOffer = data.allContentfulPizza.nodes.splice(-4)
  console.log(hotOffer)
  return (
  <Layout>
    <Header />
    <section>
      <div  className={styles.container}>
        <h1 className={styles.h1}>Experience Pizza Passion at Its Finest on Your Plate!</h1>
      </div>
    </section>

    <section>
      <div className={styles.hotOffer}>
        <div className={styles.container}>
          {hotOffer.map(pizza => {
            return (
              <div className={styles.pizzaItem} key={pizza.id}>
                <GatsbyImage 
                  image={getImage(pizza.mainImage)} 
                  alt={`Image of ${pizza.name}`} 
                  style={{width: "250px"}}
                />
                <h4>{pizza.name}</h4>
              </div>
            )
          })}
        </div>
      </div>
    </section>

  </Layout>
)}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage

export const query = graphql`
  query getAllProducts {
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
`