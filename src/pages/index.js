import * as React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../styles/_styles.module.scss"
import Header from "../components/Header/Header"
import ReviewSliderSwiper from "../components/Reviews/ReviewSliderSwiper"


const IndexPage = ({data}) => {
  
  const hotOffer = data.allContentfulPizza.nodes.slice(0, 4)

  return (
  <Layout>
    <div  className={styles.mainPageWrapper}>
      <Header />

      <section>
        <h1>Experience Pizza Passion at Its Finest on Your Plate!</h1>
        <div className={styles.container}>
          <div className={styles.hotOffer}>
            {hotOffer.map(pizza => {
              return (
                <div className={styles.pizzaItem} key={pizza.id}>
                  <Link to={`../${pizza.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[" "]/g, "-").toLowerCase()}`}>
                    <GatsbyImage 
                      image={getImage(pizza.mainImage)} 
                      alt={`Image of ${pizza.name}`} 
                      style={{maxWidth: "250px", margin: "auto"}}
                    />
                  </Link>
                  <Link to={`../${pizza.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[" "]/g, "-").toLowerCase()}`}>
                    <h4>{pizza.name}</h4>
                  </Link>
                </div>
              )
            })}
          </div>
          <Link to="/menu"><button className={styles.allProducts}>all products</button></Link>
        </div>
      </section>

      <section>
        <h2>Embark on a Flavor Journey with Our Exquisite Pizzas!</h2>
        <div className={styles.container}>
          <div className={styles.about}>
            <StaticImage className={styles.aboutImage} src="../images/pizzayolo.jpg" alt="pizzayola image" />
            <p className={styles.text}>At our pizzeria, we believe in the power of love in every slice. Our dedicated chefs pour their passion into crafting each pizza, using only the best and freshest ingredients available. We take pride in delivering not just a meal, but an experience that delights our cherished clients' taste buds and warms their hearts. Join us in savoring the true essence of pizza, made with love, just for you.</p>
            <div className={styles.extraInfo}>
              <div className={styles.left}>
                <span>Types of pizzas</span>
                <span>46</span>
              </div>
              <div className={styles.right}>
                <span>clients per hour</span>
                <span>252</span>
              </div>
              <StaticImage className={styles.aboutBackground} src="../images/vegs_bg.svg" alt="background" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <StaticImage src="../images/pizza_main_page.jpg" alt="pizza image" style={{maxHeight: "700px", margin: "50px 0 0"}} />
      </section>

      <section>
        <div className={styles.testimonials}>
            <div className={styles.testimonialsContainer}>
              <ReviewSliderSwiper />
            </div>
            
            <StaticImage src="../images/pizza_people.jpg" alt="people are eating pizza image" style={{maxHeight: "500px"}}/* height={600} layout="fullWidth" *//>
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