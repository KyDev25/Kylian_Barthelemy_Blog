import auth from "@/api/middlewares/auth"
import checkPerms from "@/api/middlewares/checkPerms"
import validate from "@/api/middlewares/validate"
import mw from "@/api/mw"
import hashPassword from "@/db/hashPassword"
import { AVERAGE_PASSWORD_HASHING_DURATION } from "@/pages/api/constants"
import sanitizeUsers from "@/pages/api/utils/sanitizeUsers"
import sleep from "@/utils/sleep"
import {
  emailValidator,
  passwordValidator,
  firstNameValidator,
  lastNameValidator,
  pageValidator,
} from "@/utils/validators"

const handle = mw({
  POST: [
    validate({
      body: {
        email: emailValidator.required(),
        password: passwordValidator.required(),
        firstName: firstNameValidator.required(),
        lastName: lastNameValidator.required(),
      },
    }),
    async ({
      send,
      input: {
        body: { email, password, firstName, lastName },
      },
      models: { UserModel },
    }) => {
      const user = await UserModel.query().findOne({ email })

      if (user) {
        await sleep(AVERAGE_PASSWORD_HASHING_DURATION)

        send(true)

        return
      }

      const [passwordHash, passwordSalt] = await hashPassword(password)

      await UserModel.query().insert({
        email,
        firstName,
        lastName,
        passwordHash,
        passwordSalt,
      })

      send(true)
    },
  ],
  GET: [
    validate({
      query: {
        page: pageValidator.required(),
      },
    }),
    auth,
    checkPerms(true, false),
    async ({ send, models: { UserModel } }) => {
      const query = UserModel.query()
      const users = await query.clone()
      const [{ count }] = await query.clone().count()

      send(sanitizeUsers(users), { count })
    },
  ],
})

export default handle
