'use client';

import { useState } from 'react'
import { MoveLeft, MoveRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { useCoins } from '@/hooks/use-coins'

export default function CoinTable() {
  const [currentPage, setCurrentPage] = useState(1)
  
  const { coins = [], isLoading, error } = useCoins()

  const itemsPerPage = 10
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const displayedCoins = coins.slice(startIndex, endIndex)

  const totalPages = Math.ceil(coins.length / itemsPerPage)

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        Error: {error}. Please try again later.
      </div>
    )
  }

  return (
    <div className="bg-gray-100 rounded-lg shadow-lg w-fit h-fit ">
      <h2 className="text-2xl font-bold mt-4 mb-4 mx-4">CoinLore API Table</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="font-bold text-black">💰 Coin</TableHead>
              <TableHead className="font-bold text-black">📄 Code</TableHead>
              <TableHead className="font-bold text-black">🤑 Price</TableHead>
              <TableHead className="font-bold text-black">📉 Total Supply</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading
              ? Array(10).fill(0).map((_, index) => (
                  <TableRow key={index} className={index % 2 === 0 ? 'bg-gray-300' : ''}>
                    <TableCell><Skeleton className="h-4 w-[100px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[50px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                  </TableRow>
                ))
              : displayedCoins.map((coin, index) => (
                  <TableRow key={coin.id} className={index % 2 === 0 ? 'bg-gray-300' : ''}>
                    <TableCell className='font-semibold'>{coin.name}</TableCell>
                    <TableCell className='font-semibold'>{coin.symbol}</TableCell>
                    <TableCell className='font-semibold'>${parseFloat(coin.price_usd).toFixed(2)}</TableCell>
                    <TableCell className='font-semibold'>{parseFloat(coin.tsupply).toLocaleString()} {coin.symbol}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
      
      {coins.length > 0 && (
        <div className="flex justify-between items-center my-4 mx-4">
          <Button onClick={handlePrevPage} disabled={currentPage === 1 || isLoading} variant="ghost" className={`font-semibold ${currentPage === 1 ? 'invisible' : ''}`}>
            <MoveLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button onClick={handleNextPage} disabled={currentPage === totalPages || isLoading} variant="ghost" className={`font-semibold ${currentPage === 10 ? 'invisible' : ''}`}>
            Next <MoveRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
