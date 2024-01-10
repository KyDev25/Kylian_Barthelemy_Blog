import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import sanitizeUser from "@/pages/api/utils/sanitizeUser"
import {
  idValidator,
  emailValidator,
  passwordValidator,
  firstNameValidator,
  lastNameValidator,
} from "@/utils/validators"

const handle = mw({
  GET: [
    validate({
      query: {
        userId: idValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { userId },
      },
      models: { UserModel },
    }) => {
      const user = await UserModel.query().findById(userId).throwIfNotFound()

      send(sanitizeUser(user))
    },
  ],
  PATCH: [
    validate({
      query: {
        userId: idValidator.required(),
      },
      body: {
        email: emailValidator,
        password: passwordValidator,
        firstName: firstNameValidator,
        lastName: lastNameValidator,
      },
    }),
    async ({
      send,
      input: {
        query: { userId },
        body,
      },
      models: { UserModel },
    }) => {
      const updatedUser = await UserModel.query()
        .updateAndFetchById(userId, body)
        .throwIfNotFound()

      send(sanitizeUser(updatedUser))
    },
  ],
  DELETE: [
    validate({
      query: {
        userId: idValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        query: { userId },
      },
      models: { UserModel },
    }) => {
      const user = await UserModel.query().findById(userId).throwIfNotFound()

      await user.$query().delete()

      send(sanitizeUser(user))
    },
  ],
})

export default handle
