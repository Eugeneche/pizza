import React, { useState } from "react"
import { graphql } from "gatsby"
import Seo from "../components/seo"
import * as styles from "../styles/_template.module.scss"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import useLocalStorage from "../hooks/useLocalStorage"
import Layout from "../components/layout"


const Product = ({data/* , pageContext, children */}) => {
  
  const [ cart, setCart ] = useLocalStorage("cart", {})
  const [ quantity, setQuantity ] = useState(1)

  const addToCart = () => {
    if (cart) {
      Object.keys(cart).forEach(article => {

        cart[data.contentfulPizza.article] ? 
        setCart({...cart, [data.contentfulPizza.article]: cart[data.contentfulPizza.article] + quantity}) :
        setCart({...cart, [data.contentfulPizza.article]: quantity})
      })
    } 
  }

  return (
    <Layout>
      <div className={styles.container}> 
        <h1 className={styles.h1}>{data.contentfulPizza.name}</h1>
        <div className={styles.productContainer}>
          <GatsbyImage 
            image={getImage(data.contentfulPizza.mainImage)}
            className={styles.productImage}
            alt={`${data.contentfulPizza.name} image`}
          />
          <div className={styles.productControl}>
            <h3>{`$${data.contentfulPizza.price}`}</h3>
            <p>{`${data.contentfulPizza.weight}g`}</p>
            <div className={styles.productOrdering}>
              <input type="number" defaultValue={quantity} onChange={(e) => setQuantity(Number(e.target.value))}></input>
              <button onClick={() => addToCart()}>add to cart</button>
            </div>
            <div className={styles.productCategory}>
              <h4>category:</h4><span>{`${data.contentfulPizza.category}`}</span>
            </div>
            <div><span>Product ID:&#160;</span><span>{`${data.contentfulPizza.article}`}</span></div>
          </div>
          <div className={styles.productDescription}>{documentToReactComponents(JSON.parse(data.contentfulPizza.description.raw))}</div>
        </div>
        
      </div>
    </Layout>
)}

export default Product

export const Head = ({ data }) => (
  <Seo title={`${data.contentfulPizza.name} order online`} description={`${data.contentfulPizza.name} order online`}>
    <script type="application/ld+json">{JSON.stringify({})}</script>
  </Seo>
)


export const query = graphql`
query Item($id: String) {
  contentfulPizza(id: {eq: $id}) {
    article
    category
    description {
      raw
    }
    name
    price
    rating
    weight
    mainImage {
      gatsbyImageData
    }
  }
}
`