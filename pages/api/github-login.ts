// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {
  createOAuthAppAuth,
  createOAuthUserAuth,
} from '@octokit/auth-oauth-app'
import { Octokit } from 'octokit'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  if (method === 'POST') {
    try {
      const auth = createOAuthAppAuth({
        clientType: 'github-app',
        clientId: process.env.NEXT_PUBLIC_REACT_APP_CLIENT_ID!,
        clientSecret: process.env.REACT_APP_CLIENT_SECRET!,
      })

      const userAuth = await auth({
        type: 'oauth-user',
        code: req.body,
        factory: createOAuthUserAuth,
      }).catch((err) => {
        console.log(err)
        res.status(500).send(null)
        return null
      })

      if (!userAuth) {
        return res.status(500).send(null)
      } else {
        const authentication = await userAuth()

        const octokit = new Octokit({ auth: authentication.token })

        return octokit.rest.users
          .getAuthenticated()
          .then(({ data }) =>
            res.status(200).json({ accessToken: authentication.token, data })
          )
          .catch(() => res.status(500).send(null))
      }
    } catch (err) {
      console.log(err)
      return res.status(500).send(null)
    }
  } else {
    res.status(405).send('Method Not Allowed')
  }
}
