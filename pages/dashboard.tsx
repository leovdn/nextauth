import { useContext, useEffect } from "react"
import { Can } from "../components/Can"
import { AuthContext } from "../contexts/AuthContext"
import { useCan } from "../hooks/useCan"
import { setupApiClient } from "../services/api"
import { api } from "../services/apiClient"
import { WithSSRAuth } from "../utils/withSSRAuth"

export default function Dashboard() {
  const { user } = useContext(AuthContext)

  // const userCanSeeMetrics = useCan({
  //   roles: ["administrator", "editor"],
  // })

  useEffect(() => {
    api.get("/me").then((response) => console.log(response))
    // .catch((error) => console.log(error))
  }, [])

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>

      <Can permissions={["metrics.list"]}>
        <div>Métricas</div>
      </Can>
    </>
  )
}

export const getServerSideProps = WithSSRAuth(async (ctx) => {
  const apiClient = setupApiClient(ctx)
  const response = await apiClient.get("me")

  console.log(response)

  return {
    props: {},
  }
})
