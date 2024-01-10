import { useSession } from "@/web/components/SessionContext"
import UserHeadline from "@/web/components/UserHeadline"
import Button from "@/web/components/ui/Button"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/router"

// eslint-disable-next-line max-lines-per-function
const MyProfil = () => {
  const router = useRouter()
  const { userId } = router.query
  const { session } = useSession()

  if (typeof userId === "undefined") {
    return (
      <span className="text-4xl flex mx-auto justify-center">Loading...</span>
    )
  }

  const {
    data: { data: user },
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => axios(`/api/users/${userId}`),
    enabled: Boolean(userId),
    initialData: { data: {} },
  })

  return (
    <>
      <div className="py-4 flex flex-col gap-16">
        {session && (
          <UserHeadline
            firstName={user.result[0].firstName}
            lastName={user.result[0].lastName}
          />
        )}
      </div>
      <div className="flex justify-between">
        <div>
          <p>First Name : </p>
          <Link href={`/users/modify/firstname/${user.result[0].id}`}>
            <Button className="rounded">Modify</Button>
          </Link>
        </div>
        <div>
          <p>Last Name : </p>
          <Link href={`/users/modify/lastname/${user.result[0].id}`}>
            <Button className="rounded">Modify</Button>
          </Link>
        </div>
        <div>
          <p>Email : </p>
          <Link href={`/users/modify/email/${user.result[0].id}`}>
            <Button className="rounded">Modify</Button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default MyProfil
