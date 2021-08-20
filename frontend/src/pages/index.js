import * as React from "react"
import { Link } from "gatsby"
//import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/ui/layout"
import HeroBlock from '../components/home/HeroBlock'
//import Seo from "../components/ui/seo"

const IndexPage = () => (
  <Layout>
    <HeroBlock />
  </Layout>
)

export default IndexPage

// deleted: <Seo title="Home" /> from <Layout>

/*
deleted:

    <StaticImage
      src="../images/gatsby-astronaut.png"
      width={300}
      quality={95}
      formats={["AUTO", "WEBP", "AVIF"]}
      alt="A Gatsby astronaut"
      style={{ marginBottom: `1.45rem` }}
    />
    <p>
      <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    </p>

    from <Layout>
*/