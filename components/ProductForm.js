import Layout from '@/components/Layout'
import axios from 'axios'
import { redirect } from 'next/dist/server/api-utils'
import { Router, useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Spinner from './Spinner'
import { ReactSortable } from 'react-sortablejs'

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: existingCategory,
}) {
  const [title, setTitle] = useState(existingTitle || '')
  const [description, setDescription] = useState(existingDescription || '')
  const [category, setCategory] = useState(existingCategory || '')
  const [price, setPrice] = useState(existingPrice || '')
  const [images, setImages] = useState(existingImages || [])
  const [goToProducts, setGoToProducts] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [catagories, setcatagories] = useState([])
  const router = useRouter()
  useEffect(() => {
    axios.get('/api/categories').then((result) => {
      setcatagories(result.data)
    })
  }, [])
  const { pathname } = router
  async function saveProduct(ev) {
    ev.preventDefault()
    const data = { title, description, price, images, category }
    if (_id) {
      await axios.put('/api/products', { ...data, _id })
    } else {
      await axios.post('/api/products', data)
    }
    setGoToProducts(true)
  }
  if (goToProducts) {
    router.push('/products')
  }
  async function uploadImages(ev) {
    const files = ev.target?.files
    if (files?.length > 0) {
      setIsUploading(true)
      const data = new FormData()
      for (const file of files) {
        data.append('file', file)
      }

      const res = await axios.post('/api/upload', data)
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links]
      })
      setIsUploading(false)
    }
  }
  function updateImagesOrder(images) {
    setImages(images)
  }
  return (
    <div className="w-full h-full flex-col">
      <div className="p-7 h-1/7 text-2xl flex justify-between ">
        <h2>
          {pathname.includes('/edit') ? 'Edit Product' : 'Add New Product'}
        </h2>
        <div className="text-sm space-x-2">
          <button className="h-10 w-24  border-2 border-gray-700 rounded-md">
            Cancle
          </button>
          <button
            type="submit"
            className="h-10 w-24 00 bg-blue-600 rounded-md "
            onClick={saveProduct}
          >
            Save
          </button>
        </div>
      </div>
      <div className="flex justify-around w-full h-5/6 border-solid border-t-2 border-gray-700">
        <div className=" w-2/4 p-5 pl-7 text-bold border-solid border-r-2 border-gray-700 overflow-scroll scrollbar scrollbar-thumb-gray-700 scrollbar-track-gray-900 scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-transparent">
          <h3>Base Information</h3>
          <div className="mt-5 flex flex-col text-sm p-3 space-y-2">
            <label
              for="default-input"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Name
            </label>
            <input
              type="text"
              id="prduct_name"
              class=""
              placeholder="Loom Stars original T-shirts"
              required
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
            />
            <label
              for="default-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Category
            </label>
            <select
              value={category}
              onChange={(ev) => setCategory(ev.target.value)}
              id="category"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" selected>
                No category
              </option>
              {catagories.length > 0 &&
                catagories.map((c) => <option value={c._id}>{c.name}</option>)}
            </select>
            <label
              for="default-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Description
            </label>
            <textarea
              type="textbox"
              id="product_desscription"
              placeholder="Introducing our new womens Floral Bliss sundress the perfect addition to your summer wardrobe"
              required
              className=" scrollbar scrollbar-thumb-gray-700 scrollbar-track-gray-900 scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-transparent"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />
            <label
              for="default-input"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Images
            </label>
            <div className="space-x-2 flex h-32 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ">
              <label className="h-full w-24 min-w-24 border-gray-500 border-2 border-dashed rounded-lg flex items-center justify-center flex-col cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>

                <h3>Upload</h3>
                <input type="file" onChange={uploadImages} className="hidden" />
              </label>
              <ReactSortable
                list={images}
                setList={updateImagesOrder}
                className="flex gap-x-2"
              >
                {!!images?.length &&
                  images.map((link) => (
                    <>
                      <div key={link}>
                        <img
                          src={link}
                          className="h-full w-24 rounded-md"
                          alt=""
                        />
                      </div>
                    </>
                  ))}
              </ReactSortable>
              {isUploading && (
                <label className="h-full w-24 border-gray-500 border-2  rounded-lg flex items-center justify-center flex-col cursor-pointer">
                  <Spinner />
                  <h3>Uploading</h3>
                </label>
              )}
            </div>
            <label
              for="default-input"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Price (USD)
            </label>
            <input
              type="number"
              id="price"
              class=""
              placeholder="$ 120"
              required
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 w-2/4 p-5 space-y-2 overflow-scroll scrollbar scrollbar-thumb-gray-700 scrollbar-track-gray-900 scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-transparent">
          <h3 className="text-bold">Preview</h3>
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSuLWMSZFsF5scV6Neal1Yv0Jlo6hO8TlNbQmFmRMpeg&s"
              alt=""
              className="w-full h-auto rounded-lg"
            />
            <div className="flex justify-between pt-5 font-bold text-xl">
              <h2>{title}</h2>
              <h2>$ {price}</h2>
            </div>
            <div className="flex pt-5 justify-between">
              <div className="flex flex-col">
                <h4>Size</h4>
                <div className="flex space-x-1">
                  <span className="h-7 w-7 border-2 border-gray-500 rounded-md text-center">
                    S
                  </span>
                  <span className="h-7 w-7 border-2 border-gray-500 rounded-md text-center">
                    M
                  </span>
                  <span className="h-7 w-7 border-2 border-gray-500 rounded-md text-center">
                    L
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <h4>Color</h4>
                <div className="flex space-x-1">
                  <span className="h-7 w-7 rounded-full bg-red-500"></span>
                  <span className="h-7 w-7 rounded-full bg-blue-500"></span>
                  <span className="h-7 w-7 rounded-full bg-yellow-500"></span>
                  <span className="h-7 w-7 rounded-full bg-green-600"></span>
                </div>
              </div>
            </div>
            <div className="pt-5">
              <button className="h-10 w-full 00 bg-blue-600 rounded-md flex justify-center items-center space-x-3 text-l font-bold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                <h2>Add To Cart</h2>
              </button>
            </div>
            <div className="pt-5">
              <label
                for="default-input"
                class="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
              >
                Description
              </label>
              <p className="text-sm text-gray-400">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
