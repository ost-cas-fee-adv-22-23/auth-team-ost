import Layout from '@/components/layout';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

type GetServerSessionPageProps = {
  jwtPayload: boolean;
};

export default function GetServerSessionPage(
  props: GetServerSessionPageProps
): InferGetServerSidePropsType<typeof getServerSideProps> {
  return (
    <Layout>
      <div>
        <h1 className="text-3xl mb-3">Example with SSR and getServerSession</h1>
        <div>isAuthenticated: {!!props.jwtPayload ? 'true' : 'false'}</div>
        <div>jwtPayload: {JSON.stringify(props.jwtPayload)}</div>
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
  const jwtPayload = await getServerSession(req, res, authOptions);

  return {
    props: {
      jwtPayload,
    },
  };
};
