import api from 'api/api'

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Last-Modified', new Date())
  res.setHeader('Date', new Date())

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

    const response = await fetch(
      'https://go.botmaker.com/api/v1.0/waTemplates',
      options
    )
      .then((response) => response.json())
      .then((response) => {
        return response.json()
      })
      .catch((err) => console.error(err))

    res.status(200).json(response)
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
}
