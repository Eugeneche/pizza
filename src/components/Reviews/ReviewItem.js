import React from "react"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import * as styles from "./_Review.module.scss"

const ReviewItem = ({review}) => {


    return (
        <div className={styles.reviewItem}>
            <h4 className={styles.reviewName}>{review.name}</h4>
            <div className={styles.reviewText}>{documentToReactComponents(JSON.parse(review.testimonialText.raw))}</div>
        </div>
    )
}

export default ReviewItem