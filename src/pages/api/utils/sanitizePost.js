import sanitizeComments from "@/pages/api/utils/sanitizeComments"
import sanitizeUser from "@/pages/api/utils/sanitizeUser"

const sanitizePost = ({ user, comments, ...sanitizedPost }) => ({
  user: sanitizeUser(user),
  comments: sanitizeComments(comments),
  ...sanitizedPost,
})

export default sanitizePost
