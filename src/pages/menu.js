import React, { useState } from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import useLocalStorage from "../hooks/useLocalStorage"
import * as styles from "../styles/_styles.module.scss"

import bag from "../images/bag-icon.svg"


const Menu = ({ data }) => {

  const [ cart, setCart ] = useLocalStorage("cart", 111)

  //useLocalStorage("cart", "aa")
  //console.log(useLocalStorage("cart", 111))
  //console.log(localStorage.cart)

  console.log(cart)
  
  //console.log(localStorage.cart)
  const allCategories = []
  data.allContentfulPizza.nodes.forEach(node => {
    allCategories.push(node.category)
  })
  const uniqueCategories = [...new Set(allCategories)]

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
                  <div className={styles.productImage}  onClick={() => setCart(node.name)}>           
                    <GatsbyImage
                      image={image}
                      alt={`${node.name} pizza image`}
                    />
                    <div className={styles.bagBackground}>
                      <img src={bag} />
                    </div> 
                  </div>
                  <h3 className={styles.productName}>{node.name}</h3>
                  <h4>${node.price}</h4>
                </div>
              )           
            }
          )}
        </div>
        <div className={styles.info}>
          <h4>cart</h4>
          <div>{cart}</div>
          <h4>categories</h4>
          <ul>
            {uniqueCategories.map(category => {
              return (
                <li key={category}>
                  {category}
                </li>
              )
            })}
          </ul>
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