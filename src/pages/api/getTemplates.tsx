import api from 'api/api'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (
      !req.headers.authorization ||
      req.headers.authorization !== process.env.NEXT_PUBLIC_ACCESSTOKEN
    ) {
      return res.status(401).send('Not authorized')
    } else {
      const response = await api.get('v1.0/waTemplates', {
        headers: {
          'Content-Type': 'application/json',
          'access-token': JSON.stringify(process.env.NEXT_PUBLIC_ACCESSTOKEN)
        }
      })
      res.status(200).json(response)
    }
  } catch (error: any) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
}
