import config from "@/api/config"
import { HttpForbiddenError } from "@/api/errors"
import webConfig from "@/web/config"
import jsonwebtoken from "jsonwebtoken"

const auth = async (ctx) => {
  const {
    req: {
      headers: { authorization },
      cookies: { [webConfig.security.session.cookie.key]: cookies },
    },
    next,
  } = ctx
  const [, token] = authorization.split(" ")
  const {
    payload: { user },
  } = jsonwebtoken.verify(token, config.security.jwt.secret)
  const cookiesJwt = jsonwebtoken.verify(cookies, config.security.jwt.secret)

  if (cookiesJwt.payload !== token) {
    throw new HttpForbiddenError()
  }

  ctx.user = user

  await next()
}

export default auth
