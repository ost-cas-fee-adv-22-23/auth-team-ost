import NextAuth, { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { Issuer } from 'openid-client';

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const issuer = await Issuer.discover(process.env.ZITADEL_ISSUER ?? '');
    const client = new issuer.Client({
      client_id: process.env.ZITADEL_CLIENT_ID || '',
      token_endpoint_auth_method: 'none',
    });

    const { refresh_token, access_token, expires_at } = await client.refresh(token.refreshToken as string);
    console.warn('try to refresh');
    return {
      ...token,
      accessToken: access_token,
      expiresAt: (expires_at ?? 0) * 1000,
      refreshToken: refresh_token, // Fall back to old refresh token
    };
  } catch (error) {
    console.error('Error during refreshAccessToken', error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: 'zitadel',
      name: 'zitadel',
      type: 'oauth',
      version: '2',
      wellKnown: process.env.ZITADEL_ISSUER,
      authorization: {
        params: {
          scope: 'openid email profile',
        },
      },
      idToken: true,
      checks: ['pkce', 'state'],
      client: {
        token_endpoint_auth_method: 'none',
      },
      async profile(_, { access_token }) {
        const { userinfo_endpoint } = await (
          await fetch(`${process.env.ZITADEL_ISSUER}/.well-known/openid-configuration`)
        ).json();

        const profile = await (
          await fetch(userinfo_endpoint, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          })
        ).json();

        return {
          id: profile.sub,
          firstname: profile.given_name,
          lastname: profile.family_name,
          username: profile.preferred_username.replace('@team-ost.zitadel.cloud', ''),
          avatarUrl: profile.picture || undefined,
        };
      },
      clientId: process.env.ZITADEL_CLIENT_ID,
    },
  ],
  session: {
    maxAge: 1 * 60, // 5 minutes // 12 * 60 * 60, // 12 hours
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // account, user und profile werden nur beim ersten callback Aufruf (nach signIn) mitgegeben:
      // https://next-auth.js.org/configuration/callbacks#jwt-callback
      if (account) {
        token.accessToken = account.access_token;
        token.expiresAt = (account.expires_at as number) * 1000; // Gültigkeit Token bei ZITADEL: Defaultmässig 12 Stunden
      }

      if (user) {
        token.user = user;
      }

      /* if (Date.now() > (token.expiresAt as number)) {
        // todo: refresh token
        // https://team-ost-s0uq0a.zitadel.cloud/oauth/v2/token
        delete token.accessToken;
      }*/

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token.expiresAt as number)) {
        console.warn(Date.now(), token.expiresAt);
        return token;
      }
      console.warn('return refresh token');
      // Access token has expired, try to update it
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user = token.user;
      // accessToken wird bewusst nicht an den Client gesendet, da es nicht benötigt wird. Wenn der Zugriff nur
      // mittels pages/api erfolgt, wird das accessToken clientseitig nicht benötigt. Dieses ist nur erforderlich,
      // wenn z.B. eine andere api angezapft wird.
      // session.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
