import sanitizeComment from "@/pages/api/utils/sanitizeComment"

const sanitizeComments = (comments) =>
  comments.map((comment) => sanitizeComment(comment))

export default sanitizeComments
