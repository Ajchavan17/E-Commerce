import Layout from '@/components/Layout'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function products() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    axios.get('/api/products').then((Response) => {
      setProducts(Response.data)
    })
  }, [])
  return (
    <Layout>
      <div className="w-full h-full flex flex-col ">
        <div className="p-7 max-h-15 text-2xl flex justify-between ">
          <h2>Products</h2>
          <Link href={'/products/new'} className="text-sm space-x-2">
            <button className="h-10 w-32 00 bg-blue-600 rounded-md font-bold">
              Add New Product
            </button>
          </Link>
        </div>
        <div className="h-full p-7 grid grid-cols-5 ml-7 gap-y-8 overflow-scroll scrollbar scrollbar-thumb-gray-700 scrollbar-track-gray-900 scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-transparent">
          {products.map((product) => (
            <div
              key={product._id}
              className="h-96 max-h-96 w-60 border-2 border-gray-700 rounded-lg flex flex-col text-left overflow-hidden space-y-1 hoverLinks hover:border-white hover:border-1 text-gray-500 hover:text-white"
            >
              <img
                className="h-56 w-72"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoNaLFFSdD4YhW8mqgDBSWY8nHnte6ANHQWz6Lsl37yA&s"
                alt="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoNaLFFSdD4YhW8mqgDBSWY8nHnte6ANHQWz6Lsl37yA&s"
              />
              <div className="pl-3  hover:text-white">
                <h2 className="font-bold line-clamp-2">{product.title}</h2>
                <h2 className="">$ {product.price}</h2>
                <p className="text-xs line-clamp-2">{product.description}</p>
              </div>
              <div className="flex justify-center text-gray-500 gap-x-8 mb-3 relative pt-4">
                <Link
                  className="h-10 w-16 border-2 border-slate-600 flex items-center justify-center rounded-md"
                  href={'/products/edit/' + product._id}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 hover:text-white border-1 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </Link>
                <Link
                  className="h-10 w-16 border-2 border-slate-600 flex items-center justify-center rounded-md"
                  href={'/products/delete/' + product._id}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 hover:text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
