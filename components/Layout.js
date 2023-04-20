import Nav from '@/components/Nav'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Layout({ children }) {
  const { data: session } = useSession()
  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            onClick={() => signIn('google')}
            className="bg-white p-2 text-black px-4 rounded-lg "
          >
            Login with Google
          </button>
        </div>
      </div>
    )
  }
  return (
    <div className="max-h-screen min-h-screen flex bg-gradient-to-b from-slate-900 to-slate-800 max-h-screen">
      <Nav />

      <div className="flex-grow">{children}</div>
    </div>
  )
}
