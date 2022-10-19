import api from 'api/api'

export default async (req: any, res: any) => {
  const { x_authorization } = req.headers
  if (
    x_authorization === `access-token: ${process.env.NEXT_PUBLIC_ACCESSTOKEN}`
  ) {
    try {
      const response = await api.get('v1.0/waTemplates')
      res.json(response)
    } catch (error: any) {
      console.error(error)
      res.status(error.status || 500).end(error.message)
    }
  }
}
