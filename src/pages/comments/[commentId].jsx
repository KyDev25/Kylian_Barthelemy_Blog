import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/router"

const CommentPage = () => {
  const {
    query: { commentId },
  } = useRouter()
  const {
    data: { data: comment },
  } = useQuery({
    queryKey: ["comment"],
    queryFn: () => axios(`/api/comments/${commentId}`),
    enabled: Boolean(commentId),
    initialData: { data: {} },
  })

  if (typeof comment.result === "undefined") {
    return (
      <span className="text-4xl flex mx-auto justify-center">Loading...</span>
    )
  }

  return (
    <article className="border-t-2 border-b-2 border-black">
      <h2 className="flex mx-auto justify-center text-2xl">
        {comment.result[0].user.firstName} {comment.result[0].user.lastName}
      </h2>
      <h3 className="font-medium italic mb-2">ARTICLE</h3>
      <span>{comment.result[0].comment}</span>
    </article>
  )
}

export default CommentPage
