import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import auth from "@/api/middlewares/auth"
import { articleValidator, pageValidator } from "@/utils/validators"
import sanitizePosts from "@/pages/api/utils/sanitizePosts"

const handle = mw({
  POST: [
    validate({
      body: {
        article: articleValidator.required(),
      },
    }),
    auth,
    async ({ send, input: { body }, models: { PostModel }, user }) => {
      const newPost = await PostModel.query().insertAndFetch({
        ...body,
        userId: user.id,
      })
      send(newPost)
    },
  ],
  GET: [
    validate({
      query: {
        page: pageValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { page },
      },
      models: { PostModel },
    }) => {
      const query = PostModel.query()
      const posts = await query
        .clone()
        .withGraphFetched("[comments.[user],user]")
        .page(page)
      const [{ count }] = await query.clone().count()

      send(sanitizePosts(posts), { count })
    },
  ],
})

export default handle
