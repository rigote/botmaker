import zen from 'api/zendesk'

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Last-Modified', new Date())
  res.setHeader('Date', new Date())

  try {
    const response = await zen.get('v2/users', {
      params: { role: ['agent', 'admin'], role_type: '0' },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${process.env.NEXT_PUBLIC_ZENDESKACCESSTOKEN}`
      }
    })

    res.status(200).json(response.data)
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
}
