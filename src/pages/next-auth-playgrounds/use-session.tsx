import Layout from '@/components/layout';
import { useSession } from 'next-auth/react';

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
          Mittels useSession-Hook kann clientseitig geprüft werden, ob der Benutzer angemeldet ist oder nicht. Der
          useSession-Hook gibt den Status (loading, authenticated, unauthenticated) sowie die aktuelle Session zurück.
          Mittels session-Callback in der nextAuth-Config kann bestimmt werden, welche Informationen an den Client innerhalb
          der Session gesendet werden können. Hinweis: Erfolgt der Zugriff auf eine allfällige API einzig über das pages/api,
          muss der accessToken nicht an den Client gesendet werden. Mittels Session-Options könnte definiert werden, dass
          zwingend eine Session notwendig ist und was geschieht, wenn der Benutzer keine gültige Session besitzt. Dies kann
          allerdings auch global mittels Middleware gelöst werden.
          <br />
          <br />
          Fragen: Lebensdauer Session / Lebensdauer Token (Unterschiedliche Provider) / Refresh Token vor Ablauf mit
          unterschiedlicher Dauer? Refetching / Update der Session
          (https://next-auth.js.org/getting-started/client#refetching-the-session). Wann wird dies genutzt (Polling, wenn
          Page is visible)? Defaultmässig refetchOnWindowFocus. Soll dies global z.b. mittels PageVisible Event gehandelt
          werden?
        </div>
      </>
    </Layout>
  );
}
