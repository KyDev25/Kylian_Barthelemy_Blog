import CommentHeadline from "@/web/components/CommentHeadline"
import PostHeadline from "@/web/components/PostHeadline"
import { useSession } from "@/web/components/SessionContext"
import Button from "@/web/components/ui/Button"
import { readResource } from "@/web/services/apiClient"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

// eslint-disable-next-line max-lines-per-function
const IndexPage = (props) => {
  const { session } = useSession()
  const { page } = props
  const { isLoading, data: { data: { result: posts } = {} } = {} } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => readResource("myposts", { params: { page } }),
  })
  const { data: { data: { result: comments } = {} } = {} } = useQuery({
    queryKey: ["comments", page],
    queryFn: () => readResource("comments", { params: { page } }),
  })

  if (isLoading || !posts || !comments) {
    return (
      <span className="text-4xl flex mx-auto justify-center">Loading...</span>
    )
  }

  return (
    <div className="py-4 flex flex-col gap-16">
      <ul className="flex flex-col gap-8 border-t-2">
        {session &&
          posts
            .map(({ id: idPost, article, user, comments: allComments }) => (
              <>
                <PostHeadline
                  key={idPost}
                  id={idPost}
                  article={article}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  countComments={allComments.length}
                />
                {session.user.isAuthor && (
                  <div className="flex gap-4 justify-end">
                    <Link href={`/posts/deletepost/${idPost}`}>
                      <Button>Delete</Button>
                    </Link>
                    <Link href={`/posts/modify/${idPost}`}>
                      <Button>Modify</Button>
                    </Link>
                  </div>
                )}
                <h3 className="font-bold italic mb-2">COMMENTS</h3>
                {comments.map(({ id: idComment, comment, postId }) => (
                  <CommentHeadline
                    key={idComment}
                    comment={postId === idPost && comment}
                  />
                ))}
              </>
            ))
            .reverse()}
      </ul>
    </div>
  )
}

export default IndexPage
