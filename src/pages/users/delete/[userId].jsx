import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/router"

const DeleteUser = () => {
  const router = useRouter()
  const { userId } = router.query
  useQuery({
    queryKey: ["user"],
    queryFn: () => axios.delete(`/api/users/${userId}`),
    enabled: Boolean(userId),
    initialData: { data: {} },
  })

  return (
    <span className="text-4xl flex mx-auto justify-center">User Deleted !</span>
  )
}

export default DeleteUser
