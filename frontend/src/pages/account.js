import React, { useState, useContext } from "react"

import { UserContext } from "../contexts"
import { setUser } from "../contexts/actions"
import SEO from "../components/ui/seo"
import { useIsClient } from "../hooks"

import Layout from "../components/ui/layout"
import AuthPortal from "../components/auth/AuthPortal"
import SettingsPortal from "../components/settings/SettingsPortal"

export default function Account() {
  const { user } = useContext(UserContext)
  const { isClient, key } = useIsClient()
  if (!isClient) return null

  return (
    <Layout key={key}>
      <SEO title="Account" description="This is the Account page where you can login or signup"/>
      {user.jwt && user.onboarding ? <SettingsPortal /> : <AuthPortal />}
    </Layout>
  )
}