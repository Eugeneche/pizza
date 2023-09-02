import React, { useRef, useEffect } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as styles from "./_HeaderSwiper.module.scss"
import "./headerSwiper.css"
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
    console.log(hotOffer)

    return (
        <Carousel 
            autoplay={true}
            autoplayInterval={2000}
            wrapAround={true}
            animation='fade'
            speed={1500}
            defaultControlsConfig={{
                nextButtonStyle: {display: "none"},
                prevButtonStyle: {display: "none"},
                pagingDotsClassName: "dot"
                /* nextButtonText: 'Custom Next',
                prevButtonText: 'Custom Prev', */
                /* pagingDotsStyle: {
                  fill: 'red'
                } */
              }}
            /* withoutControls={true} */
            >
                {hotOffer.map(productObject => {
                    return (
                        <div className={styles.slide} key={productObject.id}>
                            <div className={styles.headerMotto}>Crafting Slice Perfection, One Bite at a Time!</div>
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