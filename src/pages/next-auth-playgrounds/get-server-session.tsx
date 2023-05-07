import Layout from '@/components/layout';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getServerSession, Session } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

type GetServerSessionPageProps = {
  session: Session | null;
};

export default function GetServerSessionPage(
  props: GetServerSessionPageProps
): InferGetServerSidePropsType<typeof getServerSideProps> {
  return (
    <Layout>
      <div>
        <h1 className="text-3xl mb-3">Example with SSR and getServerSession</h1>
        <div>isAuthenticated: {!!props.session ? 'true' : 'false'}</div>
        <div>jwtPayload: {JSON.stringify(props.session)}</div>
        <div className="mt-5">
          Mittels getServerSession() kann serverseitig geprüft werden, ob der Benutzer angemeldet ist oder nicht. Im
          Vergleich zu getToken() kann diese Methode ohne JWT Webtokens verwendet werden. Daher wird sie vor allem in
          Zusammenhang mit einer Datenbank eingesetzt.
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  return {
    props: {
      session,
    },
  };
};
