import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as styles from "./_HeaderSwiper.module.scss"
import "./headerSwiper.scss"
import Carousel from "nuka-carousel"


const HeaderSwiper = () => {

    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            allContentfulPizza {
                nodes {
                    id
                    category
                    name
                    price
                    mainImage {
                        gatsbyImageData
                    }
                }
            }
        }`
    )
    const hotOffer = data.allContentfulPizza.nodes.slice(0, 4)
    const mottos = ['Crafting Slice Perfection, One Bite at a Time!', 'Indulge Your Cravings with Our Irresistible Pizzas!', 'Embrace Pizza Nirvana and Delight Your Inner Food Enthusiast!', 'Discover Flavorful Bliss in Every Slice We Serve!']

    return (
        <Carousel 
            autoplay={true}
            autoplayInterval={5000}
            wrapAround={true}
            animation='fade'
            speed={2000}
            pauseOnHover={false}
            defaultControlsConfig={{
                nextButtonStyle: {display: "none"},
                prevButtonStyle: {display: "none"},
                pagingDotsClassName: "dot",
                pagingDotsContainerClassName: "dots"
            }}
        >
            {hotOffer.map((productObject, i) => {

                return (
                    <div className={styles.slide} key={productObject.id}>
                        <div className={styles.headerMotto}>{mottos[i]}</div>
                        <GatsbyImage 
                            image={getImage(productObject.mainImage)} 
                            alt={`Image of ${productObject.name}`} 
                        />
                        <div className={styles.headerPizzaName}>{productObject.name}</div>
                    </div>
                )
            })}
            
            
            
        </Carousel>

    )
}

export default HeaderSwiper