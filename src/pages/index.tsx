import { signIn, signOut, useSession } from 'next-auth/react';
import Layout from '@/components/layout';

export default function Home() {
  const { status, data } = useSession();

  const intro = (
    <>
      <h1 className="text-3xl mb-3">TeamOst NextAuth Playgrounds</h1>
      <div className="mb-5">
        <p>
          Diese Anwendung wurde im Rahmen des CAS Frontend Engineering Advanced entwickelt um einen eigenen IDP (ZITADEL) in
          Betrieb zu nehmen, einzubinden und die verschiedenen Möglichkeiten von NextAuth auszuprobieren. Dabei wurden
          folgende Konfigurationen seitens IDP vorgenommen:
        </p>
        <ul className="list-disc px-10 mb-3">
          <li>Lebensdauer des AccessTokens wurde auf XX gesetzt.</li>
          <li>
            Das Token wird 5 Minuten vor Ablauf erneuert (Sofern der JWT-Callback durchlaufen wird). Requests nach
            /api/auth/signin, /api/auth/session und Aufrufe von getSession(), getServerSession() und useSession() erzwingen
            ein Durchlaufen vom JWT-Callback.{' '}
          </li>
        </ul>
      </div>
    </>
  );

  switch (status) {
    case 'authenticated':
      return (
        <Layout>
          <>
            {intro}
            <div>Angemeldet als: {data.user.firstname}</div>
            <button className="btn btn-red" onClick={() => signOut()}>
              Abmelden
            </button>
          </>
        </Layout>
      );
    case 'unauthenticated':
      return (
        <Layout>
          <>
            {intro}
            <div>Nicht angemeldet</div>
            <button className="btn btn-blue" onClick={() => signIn('zitadel')}>
              Anmelden
            </button>
          </>
        </Layout>
      );
    default:
      // loading
      return (
        <Layout>
          <>
            {intro}
            <div>LOADING</div>
          </>
        </Layout>
      );
  }
}
