import * as React from "react"
import { Link } from "gatsby"
//import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/ui/layout"
import HeroBlock from '../components/home/HeroBlock'
import PromotionalProducts from '../components/home/PromotionalProducts'
import FeaturedProducts from '../components/home/FeaturedProducts'
import MarketingButtons from '../components/home/MarketingButtons'
//import Seo from "../components/ui/seo"


const IndexPage = () => (
  <Layout>
    <HeroBlock />
    <PromotionalProducts />
    <FeaturedProducts />
    <MarketingButtons />
  </Layout>
)

export default IndexPage

// deleted: <Seo title="Home" /> from <Layout>
