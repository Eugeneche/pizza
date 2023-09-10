import React, { useState } from "react"
import { Link, graphql } from "gatsby"
//import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import useLocalStorage from "../hooks/useLocalStorage"
import * as styles from "../styles/_cart.module.scss"

//import bag from "../images/bag-icon.svg"
//import bag_filled from "../images/bag-icon_filled.svg"
import Form from "../components/Form/Form"


const Cart = ({ data }) => {

  let htmlOrder = ''
  let totalCost = 0
  const cartForDisplay = []

  const [ cart, setCart ] = useLocalStorage("cart", {})
  const [ l, setL ] = useState(cartForDisplay.length)
  const [ dialog, setDialog ] = useState(false)
  const [ currentArticle, setCurrentArticle] = useState(0)

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

    cartForDisplay.forEach(pizzaObj => {

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

  const preRemoveItem = (article) => {

    setCurrentArticle(article)
    setDialog(true)
  }

  const removeItem = () => {

    Reflect.deleteProperty(cart, currentArticle.toString())
    setCart(cart)
    setL(cartForDisplay.length)
    setDialog(false)
  }

  return (
    <Layout>

      <div className={styles.dialogShadow} style={dialog ? {display: "block"} : {display: "none"}}> 
        <div className={styles.dialogWindow}>
          <div className={styles.dialogTitle}>Confirm your action</div>
          <div className={styles.dialogBody}>Delete an item from the cart?</div>
          <div className={styles.dialogButtons}>
            <button onClick={() => setDialog(false)}>Cancel</button>
            <button onClick={() => removeItem()}>Delete</button>
          </div>
        </div>
      </div>

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
                      <span>{`${pizzaObj.weight}g`}</span>
                      <span>{pizzaObj.quantity}</span> 
                      <span>x</span>
                      <span>{`$${pizzaObj.price}`}</span> 
                      <span>=</span>
                      <span>{`$${(pizzaObj.price * pizzaObj.quantity).toFixed(2)}`}</span>
                      <span className={styles.quantityControl}>
                        <button onClick={() => addItem(pizzaObj.article)} className={styles.add}>&#43;</button>
                        <button onClick={() => extractItem(pizzaObj.article)} className={styles.extract}>&#8722;</button>
                        <button onClick={() => preRemoveItem(pizzaObj.article)} className={styles.remove}>&#9587;</button>
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
    
          <div className={styles.emptyCart}>
            <p>Your cart is empty.</p><Link to="/menu">Would you like to place an order?</Link>
          </div>
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