import Link from "next/link"
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline"

const PostHeadline = ({ id, article, firstName, lastName, countComments }) => (
  <article className="border-t-2 border-black">
    <Link
      href={`/posts/${id}`}
      className="flex mx-auto justify-center text-2xl"
    >
      {firstName} {lastName}
    </Link>
    <h3 className="font-bold italic mb-2">ARTICLE</h3>
    <span className="flex w-full">{article}</span>
    <div className="flex mt-2">
      <ChatBubbleBottomCenterTextIcon className="w-5"></ChatBubbleBottomCenterTextIcon>
      <p className="ml-1">{countComments}</p>
    </div>
  </article>
)

export default PostHeadline
