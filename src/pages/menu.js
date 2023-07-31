import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import useLocalStorage from "../hooks/useLocalStorage"
import * as styles from "../styles/_menu.module.scss"

import bag from "../images/bag-icon.svg"


const Menu = ({ data }) => {

  const [ cart, setCart ] = useLocalStorage("cart", {})
  const [ cartForDisplay, setCartForDisplay] = useState([])
  console.log(cart)
  
  const allCategories = []
  //const cartForDisplay = []

  data.allContentfulPizza.nodes.forEach(node => {
    allCategories.push(node.category)
  })

  const uniqueCategories = [...new Set(allCategories)]

  data.allContentfulPizza.nodes.forEach(node => {
                
    return Object.keys(cart).forEach(pizzaArticle => {

      if (node.article.toString() === pizzaArticle) {
        node.quantity = cart[pizzaArticle]
        cartForDisplay.push(node)
      }
    })
  })

  const addItem = (article) => {
    setCart({...cart, [article]: cart[article] + 1})
  }

  const extractItem = (article) => {

    setCart({...cart, [article]: cart[article] - 1})
  
    if (cart[article] < 2) {
      Reflect.deleteProperty(cart, article.toString())
      setCart(cart)     
    }
  }

  console.log(cartForDisplay)

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.h1}>Menu</h1>
        <div className={styles.menuContainer}>
          <div className={styles.products}>
            {data.allContentfulPizza.nodes.map(node => {
              const image = getImage(node.mainImage)
                const currentArticle = node.article
                return (
                  <div key={node.id}>    
                    <div className={styles.productImage}>           
                      <GatsbyImage
                        image={image}
                        alt={`${node.name} pizza image`}
                      />
                      <div onClick={() => setCart({ ...cart, [currentArticle]: 1})} className={styles.bagBackground}>
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
            <ul className={styles.cartList}>
              {cartForDisplay.map(pizzaObj => {
                return (
                  <li key={pizzaObj.id}>
                    {pizzaObj.name}, {`${pizzaObj.weight} g`} - {pizzaObj.quantity} 
                    <span className={styles.quantityControl}>
                      <button onClick={() => addItem(pizzaObj.article)} className={styles.add}>&#43;</button>
                      <button onClick={() => extractItem(pizzaObj.article)} className={styles.extract}>&#8722;</button>
                    </span>
                  </li>
                )
              })}
            </ul>
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
  )
}

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