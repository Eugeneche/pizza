import React from "react"
import { graphql } from "gatsby"
import Seo from "../components/seo"
import * as styles from "../styles/_template.module.scss"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Layout from "../components/layout"


const Project = ({data, pageContext, children}) => {
  
  //console.log(pageContext)

  //const images = data.allFile.nodes
  //const imageCover = data.allFile.nodes.filter(node => node.name === `cover`)
  //const imageAll = data.allFile.nodes.filter(node => node.name === `all`)
  console.log(data.contentfulPizza.description)
  return (
    <Layout>
      <div className={styles.container}> 
        <h1 className={styles.h1}>{data.contentfulPizza.name}</h1>
        <div className={styles.projectsImages}>
          <GatsbyImage 
            image={getImage(data.contentfulPizza.mainImage)}
            className={styles.projectImage}
            alt={`${data.contentfulPizza.name} image`}
          />
        </div>
        <div className={styles.contentFromMdx}>{documentToReactComponents(JSON.parse(data.contentfulPizza.description.raw))}</div>
      </div>
    </Layout>
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
    mainImage {
      gatsbyImageData
    }
  }
}
`