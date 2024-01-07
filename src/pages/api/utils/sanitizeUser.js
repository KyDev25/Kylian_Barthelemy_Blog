const sanitizeUser = ({
  passwordHash: _passwordHash,
  passwordSalt: _passwordSalt,
  ...sanitizedUser
}) => sanitizedUser

export default sanitizeUser
