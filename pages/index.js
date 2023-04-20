import Layout from '@/components/Layout'
import Nav from '@/components/Nav'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Home() {
  return (
    <Layout>
      <div className="w-full flex-col">
        <div className="p-7 max-h-15 text-2xl flex justify-between ">
          <h2>Dashboard</h2>
        </div>
      </div>
    </Layout>
  )
}
