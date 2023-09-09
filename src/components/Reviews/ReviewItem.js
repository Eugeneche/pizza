import React from "react"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import * as styles from "./_Review.module.scss"

const ReviewItem = ({review}) => {


    return (
        <div className={styles.reviewSlide}>
            <h4>{review.name}</h4>
            <div>{documentToReactComponents(JSON.parse(review.testimonialText.raw))}</div>
        </div>
    )
}

export default ReviewItem