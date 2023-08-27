import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import useLocalStorage from "../hooks/useLocalStorage"
import * as styles from "../styles/_menu.module.scss"

import bag from "../images/bag-icon.svg"
import bag_filled from "../images/bag-icon_filled.svg"


const Menu = ({ data }) => {

  const allCategories = []
  const cartForDisplay = []
  const productsForDisplay = []
  let totalCost = 0

  const [ cart, setCart ] = useLocalStorage("cart", {})
  const [ l, setL] = useState(cartForDisplay.length)
  const [ currentCategory, setCurrentCategory ] = useState('allCategory')

  data.allContentfulPizza.nodes.forEach(node => {

    if (currentCategory === 'allCategory') {
      productsForDisplay.push(node)
    } 
    if (currentCategory !== 'allCategory' && node.category === currentCategory){
      productsForDisplay.push(node)
    }
  })
console.log(productsForDisplay)
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
      setL(cartForDisplay.length)
    }
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.h1}>Menu</h1>
        <div className={styles.menuContainer}>
          <div className={styles.products}>
            {productsForDisplay.map(node => {
              const image = getImage(node.mainImage)
                const currentArticle = node.article
                return (
                  <div key={node.id}>    
                    <div className={styles.productImage}>           
                      <GatsbyImage
                        image={image}
                        alt={`${node.name} pizza image`}
                      />
                      {!cart[currentArticle] ? 

                        <div onClick={ () => setCart({ ...cart, [currentArticle]: 1}) } className={styles.bagBackground}>
                          <img src={bag} alt="bag icon" />
                        </div> :

                        <div className={styles.bagBackground}>
                          <img src={bag_filled} alt="bag with some ordered goods icon" />
                        </div>
                      }

                    </div>
                    <h3 className={styles.productName}>{node.name}</h3>
                    <h4>${node.price}</h4>
                  </div>
                )           
              }
            )}
          </div>
          <div className={styles.info}>
            <h4>Your order</h4>
            <ul className={styles.cartList}>
              {cartForDisplay.map(pizzaObj => {
                totalCost += pizzaObj.price * pizzaObj.quantity 
                return (
                  <li key={pizzaObj.id} className={styles.productItem}>
                    <span>{pizzaObj.name}</span>
                    <span>{pizzaObj.quantity}</span>
                    <span>x</span>
                    <span>{`$${pizzaObj.price}`}</span>
                    <span className={styles.quantityControl}>
                      <button onClick={() => addItem(pizzaObj.article)} className={styles.add}>&#43;</button>
                      <button onClick={() => extractItem(pizzaObj.article)} className={styles.extract}>&#8722;</button>
                    </span>
                  </li>
                )})
              }
              <li className={styles.totalSum}>
              <span>Total:</span>
              <span>{`$${totalCost.toFixed(2)}`}</span>
              </li>
            </ul>
            <Link to="/cart" className={styles.toCartBtn}><button>To cart<span style={{position: "relative", bottom: "2px"}}> &#8594;</span></button></Link>
            <h4>categories</h4>
            {currentCategory === 'allCategory' ? 

              <ul>
                {uniqueCategories.map(category => {
                  return (
                    <li key={category} className={styles.categoryItem} onClick={() => setCurrentCategory(category)}>
                      {category}
                    </li>
                  )
                })}
              </ul> :

              <ul>
                <li className={styles.selectedCategory}>{`- ${currentCategory}`}</li>
                <li className={styles.categoryItem} onClick={() => setCurrentCategory('allCategory')}>Show all categories</li>
              </ul>
            }
            
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