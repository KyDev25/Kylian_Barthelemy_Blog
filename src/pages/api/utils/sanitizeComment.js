import sanitizeUser from "@/pages/api/utils/sanitizeUser"

const sanitizeComment = ({ user, ...sanitizedComment }) => ({
  user: sanitizeUser(user),
  ...sanitizedComment,
})

export default sanitizeComment
