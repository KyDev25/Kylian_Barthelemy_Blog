import auth from "@/api/middlewares/auth"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import sanitizePosts from "@/pages/api/utils/sanitizePosts"
import { pageValidator } from "@/utils/validators"

const handle = mw({
  GET: [
    validate({
      query: {
        page: pageValidator.required(),
      },
    }),
    auth,
    async ({ send, models: { CommentModel }, user }) => {
      const query = CommentModel.query()
      const comments = await query
        .clone()
        .withGraphFetched("user")
        .where("userId", user.id)
      const [{ count }] = await query.clone().count()

      send(sanitizePosts(comments), { count })
    },
  ],
})

export default handle
