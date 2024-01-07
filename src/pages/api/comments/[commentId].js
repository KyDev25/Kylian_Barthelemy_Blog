import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import sanitizeComment from "@/pages/api/utils/sanitizeComment"
import { idValidator, commentValidator } from "@/utils/validators"

const handle = mw({
  GET: [
    validate({
      query: {
        commentId: idValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { commentId },
      },
      models: { CommentModel },
    }) => {
      const comment = await CommentModel.query()
        .findById(commentId)
        .withGraphFetched("user")
        .throwIfNotFound()

      send(sanitizeComment(comment))
    },
  ],
  PATCH: [
    validate({
      query: {
        commentId: idValidator.required(),
      },
      body: {
        comment: commentValidator,
      },
    }),
    async ({
      send,
      input: {
        query: { commentId },
        body,
      },
      models: { CommentModel },
    }) => {
      const updatedComment = await CommentModel.query()
        .updateAndFetchById(commentId, body)
        .withGraphFetched("user")
        .throwIfNotFound()

      send(sanitizeComment(updatedComment))
    },
  ],
  DELETE: [
    validate({
      query: {
        commentId: idValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { commentId },
      },
      models: { CommentModel },
    }) => {
      const comment = await CommentModel.query()
        .findById(commentId)
        .withGraphFetched("user")
        .throwIfNotFound()

      await comment.$query().delete()

      send(sanitizeComment(comment))
    },
  ],
})

export default handle
