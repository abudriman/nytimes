// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Record<string, any>>
) {
  const URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json"
  const secretQuery: Record<string, string> = { ...req.query, 'api-key': process.env.NYTIMES_API_SECRET ?? '' }
  const queryString = new URLSearchParams(secretQuery)

  try {
    const response = await fetch(URL + '?' + queryString.toString())
    const json = await response.json()
    res.status(200).json(json)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      fault: {
        "faultstring": "Unknown error",
        "detail": {
          "errorcode": "kmzway87aa"
        }
      }
    })
  }
}
