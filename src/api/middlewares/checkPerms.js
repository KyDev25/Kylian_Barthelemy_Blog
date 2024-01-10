import { HttpAuthenticationError, HttpForbiddenError } from "@/api/errors"

const checkPerms =
  (isAdmin = false, isAuthor = true) =>
  async ({ user, next, models: { UserModel } }) => {
    if (!user) {
      throw new HttpAuthenticationError()
    }

    const userInfo = await UserModel.query().findById(user.id).throwIfNotFound()

    if (!userInfo.isActive) {
      throw new HttpAuthenticationError()
    }

    if (isAuthor && !userInfo.isAuthor) {
      throw new HttpForbiddenError()
    }

    if (isAdmin && !userInfo.isAdmin) {
      throw new HttpForbiddenError()
    }

    await next()
  }

export default checkPerms
