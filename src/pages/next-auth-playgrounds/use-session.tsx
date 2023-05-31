import Layout from '@/components/layout';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

export default function UseSessionPage() {
  const { status, data } = useSession();
  return (
    <Layout>
      <>
        <h1 className="text-3xl mb-3">Example with useSession</h1>
        <div className="mb-5">
          <div>Status: {status}</div>
          <div>Expires (Session und nicht Token): {data?.expires}</div>
          <div>
            User: {data?.user?.firstname} {data?.user?.lastname}
          </div>
        </div>
        <div>
          <p>
            Mittels useSession-Hook kann clientseitig geprüft werden, ob der Benutzer angemeldet ist oder nicht. Der
            useSession-Hook gibt den Status (loading, authenticated, unauthenticated) sowie die aktuelle Session zurück.
            Mittels session-Callback in der nextAuth-Config kann bestimmt werden, welche Informationen an den Client
            innerhalb der Session gesendet werden können. Hinweis: Erfolgt der Zugriff auf eine allfällige API einzig über
            das pages/api, muss der accessToken nicht an den Client gesendet werden. Mittels Session-Options könnte definiert
            werden, dass zwingend eine Session notwendig ist und was geschieht, wenn der Benutzer keine gültige Session
            besitzt. Dies kann allerdings auch global mittels Middleware gelöst werden.
          </p>
          <p>
            Grundsätzlich muss sich der Benutzer nach Ablauf der Session neu anmelden, unabhängig von der Gültigkeitsdauer
            des Tokens. Das AccessToken kann mittels RefreshToken erneuert werden. Defaultmässig wird die Session bei einem
            WindowFocus-Event erneuert (refetchOnWindowFocus ist defaultmässig auf true). Es gibt allerdings auch die
            Möglichkeit die Session periodisch zu pollen und somit zu erneuern (
            <Link href={'https://next-auth.js.org/getting-started/client#refetching-the-session'}>
              https://next-auth.js.org/getting-started/client#refetching-the-session
            </Link>
            ). Ob dies gewünscht ist hängt vom jeweiligen Anwendungsfall ab.
          </p>
        </div>
      </>
    </Layout>
  );
}
