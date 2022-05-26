import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next"
import { parseCookies } from "nookies"

export function WithSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx)

    if (!cookies["nextath.token"]) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      }
    }

    return await fn(ctx)
  }
}
