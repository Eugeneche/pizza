import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Review from "./ReviewItem"
import Carousel from "nuka-carousel"
import * as styles from "./_Review.module.scss"
import "./reviewSwiper.scss"


const ReviewSliderSwiper = () => {
  
  const query = useStaticQuery(graphql`
    query getAllTestimonials {
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
  `)

  const reviews = query.allContentfulTestimonial.nodes

  return (
    <Carousel 
        autoplay={true}
        autoplayInterval={5000}
        wrapAround={true}
        /* animation='fade' */
        speed={1000}
        pauseOnHover={false}
        cellSpacing={100}
        defaultControlsConfig={{
            nextButtonStyle: {display: "none"},
            prevButtonStyle: {display: "none"},
            pagingDotsClassName: "review-dot",
            pagingDotsContainerClassName: "review-dots"
        }}
    >

      {reviews.map(review => {
            return <Review key={review.id} review={review} />
      })}
        
    </Carousel>
  )
}

export default ReviewSliderSwiper