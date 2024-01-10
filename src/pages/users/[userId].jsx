import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/router"

const UserPage = () => {
  const {
    query: { userId },
  } = useRouter()
  const {
    data: { data: user },
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => axios(`/api/users/${userId}`),
    enabled: Boolean(userId),
    initialData: { data: {} },
  })

  if (typeof user.result === "undefined") {
    return (
      <span className="text-4xl flex mx-auto justify-center">Loading...</span>
    )
  }

  return (
    <article className="border-t-2 border-b-2 border-black">
      <h2 className="flex mx-auto justify-center text-2xl">
        {user.result[0].user.firstName} {user.result[0].user.lastName}
      </h2>
      <p>User Mofied !</p>
    </article>
  )
}

export default UserPage
