'use client'

import { useState, useEffect } from 'react'

interface Coin {
  id: string
  symbol: string
  name: string
  nameid: string
  rank: number
  price_usd: string
  percent_change_24h: string
  percent_change_1h: string
  percent_change_7d: string
  price_btc: string
  market_cap_usd: string
  volume24: number
  volume24a: number
  csupply: string
  tsupply: string
  msupply: string
}

export function useCoins() {
  const [coins, setCoins] = useState<Coin[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCoins = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch('https://api.coinlore.net/api/tickers/')
        if (!response.ok) {
          if (response.status === 429) {
            throw new Error('API rate limit exceeded. Please try again later.')
          }
          throw new Error('Failed to fetch data')
        }
        const data = await response.json()
        setCoins(data.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching data')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCoins()
  }, [])

  return { coins, isLoading, error }
}