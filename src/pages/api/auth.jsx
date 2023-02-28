import zen from 'api/zendesk'

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Last-Modified', new Date())
  res.setHeader('Date', new Date())

  try {
    const response = {
      zen: req.body.zendeskAccessToken,
      bot: req.body.botmakerAccessToken,
      chat: req.body.chatChannelNumber
    }

    res.status(200).json(response)
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
}