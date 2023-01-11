import api from 'api/api'

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Last-Modified', new Date())
  res.setHeader('Date', new Date())

  try {
    const response = await api.post('v1.0/intent/v2', {
      params: JSON.stringify(req.body.apiParams),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    res.status(200).json(response.data)
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
}
