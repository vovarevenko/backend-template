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

export async function googleGetTokenInfo(token: string): Promise<TokenInfo> {
  const res: TokenInfoResponse = await axios.get(
    `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
  )

  if (!res.data || !res.data.name || !res.data.email) {
    throw new Error()
  }

  return res.data
}
