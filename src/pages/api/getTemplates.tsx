import api from 'api/api'
import { NextApiRequest, NextApiResponse } from 'next'

// export default async (req: any, res: any) => {
//   try {
//     const response = await api.get('v1.0/waTemplates', {
//       headers: {
//         'access-token': JSON.stringify(process.env.NEXT_PUBLIC_ACCESS_TOKEN)
//       }
//     })
//     res.json(response)
//   } catch (error: any) {
//     console.error(error)
//     res.status(error.status || 500).end(error.message)
//   }
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { authorization } = req.headers

    if (
      authorization === `access-token: ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
    ) {
      try {
        const response = await api.get('v1.0/waTemplates')
        res.status(200).json(response)
      } catch (error: any) {
        console.error(error)
        res.status(error.status || 500).end(error.message)
      }
    } else {
      res.status(401).end()
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
