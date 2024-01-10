import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import CommentModel from "@/db/models/CommentModel"
import sanitizePost from "@/pages/api/utils/sanitizePost"
import { idValidator, articleValidator } from "@/utils/validators"

const handle = mw({
  GET: [
    validate({
      query: {
        postId: idValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { postId },
      },
      models: { PostModel },
    }) => {
      const post = await PostModel.query()
        .findById(postId)
        .withGraphFetched("[comments.[user],user]")
        .throwIfNotFound()
      const [{ count }] = await CommentModel.query()
        .where("postId", postId)
        .count()
      send(sanitizePost(post), { count })
    },
  ],
  PATCH: [
    validate({
      query: {
        postId: idValidator.required(),
      },
      body: {
        article: articleValidator,
      },
    }),
    async ({
      send,
      input: {
        query: { postId },
        body,
      },
      models: { PostModel },
    }) => {
      const updatedPost = await PostModel.query()
        .updateAndFetchById(postId, body)
        .withGraphFetched("[comments.[user],user]")
        .throwIfNotFound()

      send(sanitizePost(updatedPost))
    },
  ],
  DELETE: [
    validate({
      query: {
        postId: idValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { postId },
      },
      models: { PostModel },
    }) => {
      const post = await PostModel.query()
        .findById(postId)
        .withGraphFetched("[comments.[user],user]")
        .throwIfNotFound()

      await post.$query().delete()

      send(sanitizePost(post))
    },
  ],
})

export default handle
