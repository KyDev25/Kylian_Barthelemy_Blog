import PostHeadline from "@/web/components/PostHeadline"
import { readResource } from "@/web/services/apiClient"
import { useQuery } from "@tanstack/react-query"

const IndexPage = (props) => {
  const { page } = props
  const { isLoading, data: { data: { result: comments } = {} } = {} } =
    useQuery({
      queryKey: ["comments", page],
      queryFn: () => readResource("mycomments", { params: { page } }),
    })

  if (isLoading || !comments) {
    return (
      <span className="text-4xl flex mx-auto justify-center">Loading...</span>
    )
  }

  return (
    <div className="py-4 flex flex-col gap-16">
      <ul className="flex flex-col gap-8">
        {comments
          .map(({ id, comment, user }) => (
            <PostHeadline
              key={id}
              id={id}
              article={comment}
              firstName={user.firstName}
              lastName={user.lastName}
              countComments={comments.length}
            />
          ))
          .reverse()}
      </ul>
    </div>
  )
}

export default IndexPage
