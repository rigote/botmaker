import api from 'api/api'

export default async (req: any, res: any) => {
  try {
    const response = await api.get('v1.0/waTemplates', {
      headers: {
        'access-token':
          'eyJhbGciOiJIUzUxMiJ9.eyJidXNpbmVzc0lkIjoiaW5mb2N1c2N4ZGVtbyIsIm5hbWUiOiJUaWFnbyBTYW5jaGVzIiwiYXBpIjp0cnVlLCJpZCI6IjRZV09PNTJRMnRSZndqVDRqN0ZWakNYUDVwSDIiLCJleHAiOjE4MTE5NDEyMzQsImp0aSI6IjRZV09PNTJRMnRSZndqVDRqN0ZWakNYUDVwSDIifQ.0lmyktsqGAtn0jdYdEj--_9yMmwet_mRlcfUkQGXjmODqALcQSnFyhSOAeCY3DHrkp3Lo-E-K_O5cSNQbrr1yg'
      }
    })
    res.json(response)
  } catch (error: any) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
}
