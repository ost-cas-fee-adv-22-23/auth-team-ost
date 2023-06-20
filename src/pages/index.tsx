import { signIn, signOut, useSession } from 'next-auth/react';
import Layout from '@/components/layout';
import Link from 'next/link';

export default function Home() {
  const { status, data } = useSession();

  const intro = (
    <>
      <h1 className="text-3xl mb-3">TeamOst NextAuth Playgrounds</h1>
      <div className="mb-5">
        <p>
          Diese Anwendung wurde im Rahmen des CAS Frontend Engineering Advanced entwickelt um einen eigenen IDP (
          <Link href="https://zitadel.com/">ZITADEL</Link>) in Betrieb zu nehmen, einzubinden und die verschiedenen
          Möglichkeiten von NextAuth auszuprobieren. Dabei wurde auf ZITADEL ein Projekt mit einer Webapplikation und PKCE
          Authentifizierungs Methode aufgesetzt. Folgende Einstellungen weichen vom Standard ab:
        </p>
        <ul className="list-disc px-10 mb-3">
          <li>Lebensdauer des AccessTokens wurde auf 0.1 Stunden (6 Minuten) gesetzt.</li>
          <li>
            Das AccessToken wird nach Ablauf erneuert (Sofern der JWT-Callback durchlaufen wird und ein gültiges RefreshToken
            vorhanden ist). Requests nach /api/auth/signin, /api/auth/session und Aufrufe von getSession(),
            getServerSession() und useSession() erzwingen ein Durchlaufen vom JWT-Callback.
          </li>
        </ul>
        <p>Die Session von NextAuth hat eine Gültigkeit von 3 Stunden.</p>
      </div>
    </>
  );

  switch (status) {
    case 'authenticated':
      return (
        <Layout>
          <>
            {intro}
            <div>Angemeldet als: {data.user?.firstname}</div>
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
      // loading state
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
