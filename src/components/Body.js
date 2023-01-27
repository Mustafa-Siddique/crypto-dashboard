import React from 'react'
import { SearchArea } from './SearchArea'

export const Body = () => {
  return (
    <div className="container mx-auto dark:bg-gray-800 dark:text-white mt-12">
        <div className='grid grid-cols-3 gap-4'>
        <div className="col-span-2">
            <SearchArea/>
        </div>
        <div className="col-span-1">
            Nothing
        </div>
    </div>
    </div>
  )
}
