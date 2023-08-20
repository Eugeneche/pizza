import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Review from "./ReviewItem"
import * as styles from "./_Review.module.scss"


const ReviewSlider = () => {
    
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

  const[leftValue, setLeftValue] = useState(0)
  const reviews = query.allContentfulTestimonial.nodes

  useEffect(() => {

    const moveLeft = setInterval(() => {
      if (leftValue >= 0 && leftValue < reviews.length - 1) {
        setLeftValue(leftValue => leftValue + 1)
      }
      if (leftValue >= reviews.length - 1) {
        setLeftValue(0)
      }      
    }, 3000)

    return () => {
      clearInterval(moveLeft)
    }
  }, [leftValue, reviews.length])

    return (
        <div className={styles.reviewSlider} style={{left: `${leftValue * -130}%`}}>
          {reviews.map(review => {
              return <Review key={review.id} review={review} />
          })}
        </div>
    )
}

export default ReviewSlider