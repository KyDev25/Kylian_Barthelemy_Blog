import { useSession } from "@/web/components/SessionContext"
import Link from "@/web/components/ui/Link"

// eslint-disable-next-line max-lines-per-function
const MainMenu = ({ children: _, ...otherProps }) => {
  const { session, signOut } = useSession()

  return (
    <nav {...otherProps}>
      <ul className="flex justify-between p-5 text-1xl gap-4">
        <li>
          <Link href="/" styless>
            Home
          </Link>
        </li>
        {session ? (
          <>
            <li>
              <Link href="/posts/list" styless>
                My posts
              </Link>
            </li>
            {session.user.isAuthor && (
              <>
                <li>
                  <Link href="/posts/create" styless>
                    Create post
                  </Link>
                </li>
                <li>
                  <Link href={`/users/profil/${session.user.id}`} styless>
                    My Account
                  </Link>
                </li>
              </>
            )}
            {session.user.isAdmin && (
              <li>
                <Link href="/admin" styless>
                  Admin
                </Link>
              </li>
            )}
            <li>
              <button onClick={signOut}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/sign-in" styless>
                Sign in
              </Link>
            </li>
            <li>
              <Link href="/sign-up" styless>
                Sign up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default MainMenu
