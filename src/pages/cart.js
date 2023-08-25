import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import useLocalStorage from "../hooks/useLocalStorage"
import * as styles from "../styles/_cart.module.scss"

//import bag from "../images/bag-icon.svg"
//import bag_filled from "../images/bag-icon_filled.svg"
import Form from "../components/Form/Form"


const Cart = ({ data }) => {

  //const allCategories = []
  let htmlOrder = ''
  let totalCost = 0
  const cartForDisplay = []

  const [ cart, setCart ] = useLocalStorage("cart", {})
  const [ l, setL] = useState(cartForDisplay.length)

  data.allContentfulPizza.nodes.forEach(node => {
                
    Object.keys(cart).forEach(pizzaArticle => {

      if (node.article.toString() === pizzaArticle) {
        node.quantity = cart[pizzaArticle]
        cartForDisplay.push(node)
      }
    })
  })

  const setOrder = () => {

    let totalCostUnrounded = 0

    cartForDisplay.map(pizzaObj => {

      htmlOrder += `${pizzaObj.article} - ${pizzaObj.name}, ${pizzaObj.weight}g - ${pizzaObj.price} X ${pizzaObj.quantity} = $${(pizzaObj.price * pizzaObj.quantity).toFixed(2)}\n`
      totalCostUnrounded += pizzaObj.price * pizzaObj.quantity     
    })
    totalCost = totalCostUnrounded.toFixed(2)
    htmlOrder += `Total cost: $${totalCost}\n`
  }

  setOrder()

  const addItem = (article) => {
    setCart({...cart, [article]: cart[article] + 1})
  }

  const extractItem = (article) => {

    setCart({...cart, [article]: cart[article] - 1})
  
    if (cart[article] < 2) {
      Reflect.deleteProperty(cart, article.toString())
      setCart(cart)
      setL(cartForDisplay.length)
    }
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.h1}>Your cart</h1>
        {cartForDisplay.length > 0 ? 

          <div>
            <div className={styles.cartContents}>
              <ul className={styles.cartList}>
                {cartForDisplay.map(pizzaObj => {
                  return (
                    <li key={pizzaObj.id} className={styles.productInfo}>
                      <span className={styles.productName}>{pizzaObj.name}</span>
                      <span>{`${pizzaObj.weight} g`}</span>
                      <span>{pizzaObj.quantity}</span> 
                      <span>x</span>
                      <span>{`$${pizzaObj.price}`}</span> 
                      <span>=</span>
                      <span>{`$${(pizzaObj.price * pizzaObj.quantity).toFixed(2)}`}</span>
                      <span className={styles.quantityControl}>
                        <button onClick={() => addItem(pizzaObj.article)} className={styles.add}>&#43;</button>
                        <button onClick={() => extractItem(pizzaObj.article)} className={styles.extract}>&#8722;</button>
                      </span>
                    </li>
                  )})
                }
                <li className={styles.productCost}>
                  <span className={styles.totalCostTitle}>Total cost:</span>
                  <span className={styles.totalCostSum}>{`$${totalCost}`}</span>
                </li>
              </ul>
            </div>

            <Form order={htmlOrder}/>
          </div> : 
    
          <p>Your cart is empty</p>
        }

      </div>  
    </Layout>
  )
}

export const Head = () => <Seo title="Cart" />

export default Cart

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