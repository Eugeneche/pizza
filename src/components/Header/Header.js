import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as styles from "./_Header.module.scss"


const Header = () => {

    const pizzasImages = useStaticQuery(
        graphql`
        query PizzasForHeader {
            allContentfulPizza {
                nodes {
                    id
                    mainImage {
                        gatsbyImageData
                    }
                    name
                }
            }
        }
    `)

    

    const pizza = pizzasImages.allContentfulPizza.nodes[0]

    
    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <div className={styles.headerMotto}>Crafting Slice Perfection, One Bite at a Time!</div>
                <GatsbyImage image={getImage(pizza.mainImage)} alt={pizza.name} />
                <div className={styles.headerPizzaName}>{pizza.name}</div>
            </div>
            

        </header>
    )
}

export default Header