import api from 'api/api'

export default async (req: any, res: any) => {
  try {
    const { x_authorization } = req.headers

    if (x_authorization === `Bearer ${process.env.NEXT_PUBLIC_ACCESSTOKEN}`) {
      const response = await api.get('v1.0/waTemplates')
      res.json(response)
    } else {
      res.status(401).end()
    }
  } catch (error: any) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
}
