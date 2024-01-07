import sanitizeUser from "@/pages/api/utils/sanitizeUser"

const sanitizeUsers = (users) => users.map((user) => sanitizeUser(user))

export default sanitizeUsers
