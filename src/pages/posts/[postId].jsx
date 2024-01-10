import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/router"

const PostPage = () => {
  const {
    query: { postId },
  } = useRouter()
  const {
    data: { data: post },
  } = useQuery({
    queryKey: ["post"],
    queryFn: () => axios(`/api/posts/${postId}`),
    enabled: Boolean(postId),
    initialData: { data: {} },
  })

  if (typeof post.result === "undefined") {
    return (
      <span className="text-4xl flex mx-auto justify-center">Loading...</span>
    )
  }

  return (
    <article className="border-t-2 border-b-2 border-black">
      <h2 className="flex mx-auto justify-center text-2xl">
        {post.result[0].user.firstName} {post.result[0].user.lastName}
      </h2>
      <h3 className="font-medium italic mb-2">ARTICLE</h3>
      <span>{post.result[0].article}</span>
    </article>
  )
}

export default PostPage
