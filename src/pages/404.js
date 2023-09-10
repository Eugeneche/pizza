import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

import * as styles from "../styles/_styles.module.scss"

const NotFoundPage = () => (
  <Layout>
    <div className={styles.container}>
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <Link to="/menu" style={{color: "white"}}>See our menu</Link>
    </div>
  </Layout>
)

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage
