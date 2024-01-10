import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/router"

const DeletePost = () => {
  const router = useRouter()
  const { postId } = router.query
  useQuery({
    queryKey: ["post"],
    queryFn: () => axios.delete(`/api/posts/${postId}`),
    enabled: Boolean(postId),
    initialData: { data: {} },
  })

  return (
    <span className="text-4xl flex mx-auto justify-center">Post Deleted !</span>
  )
}

export default DeletePost
