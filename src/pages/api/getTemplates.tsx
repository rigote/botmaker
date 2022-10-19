import api from 'api/api'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // const response = await api.get('v1.0/waTemplates', {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'access-token': JSON.stringify(process.env.NEXT_PUBLIC_ACCESSTOKEN)
    //   }
    // })
    const options = {
      method: 'GET',
      headers: {
        'access-token': JSON.stringify(process.env.NEXT_PUBLIC_ACCESSTOKEN)
      }
    }

    const response = fetch(
      'https://go.botmaker.com/api/v1.0/waTemplates',
      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err))

    res.status(200).json(response)
  } catch (error: any) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
}
