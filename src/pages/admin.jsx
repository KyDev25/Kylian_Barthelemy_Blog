import UserHeadline from "@/web/components/UserHeadline"
import { useSession } from "@/web/components/SessionContext"
import Button from "@/web/components/ui/Button"
import { readResource } from "@/web/services/apiClient"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

// eslint-disable-next-line max-lines-per-function
const IndexPage = (props) => {
  const { session } = useSession()
  const { page } = props
  const { isLoading, data: { data: { result: users } = {} } = {} } = useQuery({
    queryKey: ["users", page],
    queryFn: () => readResource("users", { params: { page } }),
  })

  if (isLoading || !users) {
    return (
      <span className="text-4xl flex mx-auto justify-center">Loading...</span>
    )
  }

  return (
    <div className="py-4 flex flex-col gap-16">
      <ul className="flex flex-col gap-8 border-t-2">
        {session &&
          session.user.isAdmin &&
          users
            .map(({ id, firstName, lastName, isActive }) => (
              <>
                <UserHeadline
                  key={id}
                  firstName={firstName}
                  lastName={lastName}
                />
                <>
                  <div className="flex justify-between">
                    <Link href={`/users/delete/${id}`}>
                      <Button className="rounded">Delete</Button>
                    </Link>
                    <div>
                      <p>First Name : </p>
                      <Link href={`/users/modify/firstname/${id}`}>
                        <Button className="rounded">Modify</Button>
                      </Link>
                    </div>
                    <div>
                      <p>Last Name : </p>
                      <Link href={`/users/modify/lastname/${id}`}>
                        <Button className="rounded">Modify</Button>
                      </Link>
                    </div>
                    <div>
                      <p>Email : </p>
                      <Link href={`/users/modify/email/${id}`}>
                        <Button className="rounded">Modify</Button>
                      </Link>
                    </div>
                    {isActive ? (
                      <Link href={`/users/desactivate/${id}`}>
                        <Button className="rounded">Desactivate</Button>
                      </Link>
                    ) : (
                      <Link href={`/users/activate/${id}`}>
                        <Button className="rounded">Activate</Button>
                      </Link>
                    )}
                  </div>
                </>
              </>
            ))
            .reverse()}
      </ul>
    </div>
  )
}

export default IndexPage
