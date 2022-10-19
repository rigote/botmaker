import local from 'api/local'
import useSWR from 'swr'

export const useGet = (url?: string, token?: string) => {
  return useSWR(url, (url: string) =>
    local
      .get(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((r) => r.data)
  )
}

interface IPost {
  url: string
  data: any
  token?: string
}
export const usePost = async ({ url, data, token }: IPost) => {
  const res = await local.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  return JSON.stringify(res)
}

interface IDelete {
  url: string
  data: any
  token?: any
}
export const useDelete = async ({ url, data, token }: IDelete) => {
  const res = await local.delete(url, {
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })

  return JSON.stringify(res)
}
