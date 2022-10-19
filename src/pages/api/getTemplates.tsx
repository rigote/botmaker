import api from 'api/api'

export default async (req: any, res: any) => {
  try {
    const response = await api.get('v1.0/waTemplates', {
      headers: {
        'access-token': JSON.stringify(process.env.NEXT_PUBLIC_ACCESSTOKEN)
      }
    })
    res.json(response)
  } catch (error: any) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
}
