import React from "react"
import { graphql } from "gatsby"
import Seo from "../components/seo"
import * as styles from "../style/_style.module.scss"
import { GatsbyImage } from "gatsby-plugin-image"


const Project = ({data, pageContext, children}) => {
  
  //console.log(pageContext)

  //const images = data.allFile.nodes
  //const imageCover = data.allFile.nodes.filter(node => node.name === `cover`)
  //const imageAll = data.allFile.nodes.filter(node => node.name === `all`)
  //console.log(data)
  return (
    <>
      <div className={styles.container}> 
        <h1  className={styles.projectsHeader}>{data.contentfulPizza.name}</h1>
        <div className={styles.projectsImages}>
          <GatsbyImage 
            image={getImage(data.contentfulPizza.mainImage)}
            className={styles.projectImage}
            alt={`${data.contentfulPizza.name} image`}
          />
        </div>
        <div className={styles.contentFromMdx} dangerouslySetInnerHTML={{__html: `${data.contentfulPizza.description.raw}`}} />
      </div>
    </>
)}

export default Project

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
  }
}
`