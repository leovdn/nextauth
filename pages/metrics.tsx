import { useContext, useEffect } from "react"
import { Can } from "../components/Can"
import { AuthContext } from "../contexts/AuthContext"
import { useCan } from "../hooks/useCan"
import { setupApiClient } from "../services/api"
import { api } from "../services/apiClient"
import { WithSSRAuth } from "../utils/withSSRAuth"

export default function Metrics() {
  return (
    <>
      <h1>Metrics</h1>
    </>
  )
}

export const getServerSideProps = WithSSRAuth(
  async (ctx) => {
    const apiClient = setupApiClient(ctx)
    const response = await apiClient.get("me")

    return {
      props: {},
    }
  },
  {
    permissions: ["metrics.list"],
    roles: ["administrator"],
  }
)
