import { useSession } from "@/web/components/SessionContext"
import UserHeadline from "@/web/components/UserHeadline"
import Button from "@/web/components/ui/Button"
import Link from "next/link"

const MyProfil = () => {
  const { session } = useSession()

  return (
    <>
      <div className="py-4 flex flex-col gap-16">
        {session && <UserHeadline />}
      </div>
      {session && (
        <div className="flex justify-between">
          <div>
            <p>First Name : </p>
            <Link href={`/users/modify/firstname/${session.user.id}`}>
              <Button className="rounded">Modify</Button>
            </Link>
          </div>
          <div>
            <p>Last Name : </p>
            <Link href={`/users/modify/lastname/${session.user.id}`}>
              <Button className="rounded">Modify</Button>
            </Link>
          </div>
          <div>
            <p>Email : </p>
            <Link href={`/users/modify/email/${session.user.id}`}>
              <Button className="rounded">Modify</Button>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default MyProfil
