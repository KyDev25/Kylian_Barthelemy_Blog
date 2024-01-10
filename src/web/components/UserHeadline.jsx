import { UserIcon } from "@heroicons/react/24/outline"

const UserHeadline = ({ firstName, lastName }) => (
  <article className="border-t-2 border-black flex">
    <UserIcon className="w-5"></UserIcon>
    <h2 className="flex mx-auto justify-center text-2xl">
      {firstName} {lastName}
    </h2>
  </article>
)

export default UserHeadline
