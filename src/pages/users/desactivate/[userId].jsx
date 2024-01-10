import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/router"

const DesactivateUser = () => {
  const router = useRouter()
  const { userId } = router.query
  useQuery({
    queryKey: ["user"],
    queryFn: () => axios.patch(`/api/users/${userId}`, { isActive: false }),
    enabled: Boolean(userId),
    initialData: { data: {} },
  })

  return (
    <span className="text-4xl flex mx-auto justify-center">
      User Desactivated !
    </span>
  )
}

export default DesactivateUser
