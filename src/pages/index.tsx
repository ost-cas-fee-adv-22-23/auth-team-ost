import { signIn, signOut, useSession } from 'next-auth/react';
import Layout from '@/components/layout';

export default function Home() {
    const { data: session } = useSession()
  if (session) {
    return (
      <Layout>
        <>
          Signed in as {session.user.firstname} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      </Layout>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}