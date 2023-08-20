import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../styles/_styles.module.scss"
import Header from "../components/Header/Header"
import ReviewSlider from "../components/Reviews/ReviewSlider"


const IndexPage = ({data}) => {
  
  const hotOffer = data.allContentfulPizza.nodes.splice(-4)
  //const testimonials = data.allContentfulTestimonial.nodes
  //console.log(testimonials)
  return (
  <Layout>
    <div  className={styles.mainPageWrapper}>
      <Header />

      <section>
        <h1 className={styles.h1}>Experience Pizza Passion at Its Finest on Your Plate!</h1>
        <div className={styles.container}>
          <div className={styles.hotOffer}>
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
          <button className={styles.allProducts}>all products</button>
        </div>
      </section>

      <section>
        <h2>Embark on a Flavor Journey with Our Exquisite Pizzas!</h2>
        <div className={styles.container}>
          <div className={styles.about}>
            <StaticImage className={styles.aboutImage} src="../images/pizzayolo.jpg" alt="pizzayola image" />
            <p className={styles.text}>Adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud. Wiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.</p>
            <div className={styles.extraInfo}>
              <div className={styles.left}>
                <span>Types of pizzas</span>
                <span>46</span>
              </div>
              <div className={styles.right}>
                <span>clients per hour</span>
                <span>252</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <StaticImage src="../images/pizza_main_page.jpg" alt="pizza image" style={{maxHeight: "700px"}}/* height={600} layout="fullWidth" *//>
      </section>

      <section>
        <div className={styles.testimonials}>
            <div className={styles.testimonialsContainer}>
              <ReviewSlider />
            </div>
            
            <StaticImage src="../images/pizza_people.jpg" alt="people are eating pizza image" style={{maxHeight: "600px"}}/* height={600} layout="fullWidth" *//>
        </div>
      </section>
          

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
    allContentfulTestimonial {
      nodes {
        id
        date
        name
        testimonialText {
          raw
        }
      }
    }
  }
`