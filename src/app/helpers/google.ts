import axios from 'axios'

interface TokenInfoResponse {
  data: {
    name: string
    email: string
  }
}

interface TokenInfo {
  name: string
  email: string
}

export async function googleGetTokenInfo(token: string) {
  // TODO: error handling
  const res: TokenInfoResponse = await axios.get(
    `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
  )

  return res.data as TokenInfo
}
