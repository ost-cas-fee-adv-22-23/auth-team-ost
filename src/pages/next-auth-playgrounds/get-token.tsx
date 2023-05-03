import Layout from '@/components/layout';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getToken } from 'next-auth/jwt';

type GetTokenPageProps = {
  jwtPayload: boolean;
};

export default function GetTokenPage(props: GetTokenPageProps): InferGetServerSidePropsType<typeof getServerSideProps> {
  {
    return (
      <Layout>
        <div>
          <h1 className="text-3xl mb-3">Example with SSR and getToken</h1>
          <div>isAuthenticated: {!!props.jwtPayload ? 'true' : 'false'}</div>
          <div>jwtPayload: {JSON.stringify(props.jwtPayload)}</div>
          <div className="mt-5">
            Mittels getToken() kann serverseitig geprüft werden, ob der Benutzer angemeldet ist oder nicht. Es ist ein
            Helper, welcher bei der Verwendung von JWT Web tokens verwendet werden kann. getToken() übernimmt die decryption
            und verification. In diesem Beispiel wird der jwtPayload als ServerSideProp an den Client gesendet um diesen
            darzustellen. In der Praxis sollte dies nicht gemacht werden. Wird auf einer Page mit SSR zusätzlich clientseitig
            die Information benötigt ob der Benutzer angemeldet ist oder nicht, so sollte einzig ein boolean Prop
            isAuthenticated an den Client gesendet werden. So könnte z.B. der Layout-Shift umgangen werden, welcher durch die
            Verwendung des useSession-Hooks entstehen würde.
            <br />
            <br />
            Fragen: Benutzer hat die Seite (SSR) geöffnet und die Session läuft ab (z.B. mobile Tab). Es gibt im Vergleich
            zum useSession Hook kein refetching.
          </div>
        </div>
      </Layout>
    );
  }
}
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const jwtPayload = await getToken({ req });

  return {
    props: {
      jwtPayload,
    },
  };
};
