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
    async ({ send, models: { PostModel }, user }) => {
      const query = PostModel.query()
      const posts = await query
        .clone()
        .withGraphFetched("[comments.[user],user]")
        .where("userId", user.id)
      const [{ count }] = await query.clone().count()

      send(sanitizePosts(posts), { count })
    },
  ],
})

export default handle
