import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import auth from "@/api/middlewares/auth"
import {
  commentValidator,
  idValidator,
  pageValidator,
} from "@/utils/validators"
import sanitizeComments from "@/pages/api/utils/sanitizeComments"

const handle = mw({
  POST: [
    validate({
      body: {
        comment: commentValidator.required(),
        postId: idValidator.required(),
      },
    }),
    auth,
    async ({ send, input: { body }, models: { CommentModel }, user }) => {
      const newComment = await CommentModel.query().insertAndFetch({
        ...body,
        userId: user.id,
      })

      send(newComment)
    },
  ],
  GET: [
    validate({
      query: {
        page: pageValidator.required(),
      },
    }),
    async ({ send, models: { CommentModel } }) => {
      const query = CommentModel.query()
      const comments = await query.clone().withGraphFetched("user")
      const [{ count }] = await query.clone().count()

      send(sanitizeComments(comments), { count })
    },
  ],
})

export default handle
