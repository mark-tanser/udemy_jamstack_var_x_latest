import * as React from "react"
import { Link } from "gatsby"
//import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/ui/layout"
import HeroBlock from '../components/home/HeroBlock'
import PromotionalProducts from '../components/home/PromotionalProducts'
//import Seo from "../components/ui/seo"

const IndexPage = () => (
  <Layout>
    <HeroBlock />
    <PromotionalProducts />
  </Layout>
)

export default IndexPage

// deleted: <Seo title="Home" /> from <Layout>
