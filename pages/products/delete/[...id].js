import Layout from '@/components/Layout'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function DeleteProductPage() {
  const router = useRouter()
  const [productInfo, setProductInfo] = useState()
  const { id } = router.query
  useEffect(() => {
    if (!id) {
      return
    }
    axios.get('/api/products?id=' + id).then((response) => {
      setProductInfo(response.data)
    })
  }, [id])
  function goBack() {
    router.push('/products')
  }
  async function deleteProduct() {
    await axios.delete('/api/products?id=' + id)
    goBack()
  }
  return (
    <Layout>
      <div className="h-full flex justify-center mt-20">
        <div className="h-52 w-96 flex flex-col justify-center items-center bg-slate-600 rounded-md space-y-3">
          <h2>Do you reallt want to delete "{productInfo?.title}"?</h2>
          <div className="flex gap-x-4 ">
            <button onClick={goBack} className="btn-default">
              Cancel
            </button>
            <button onClick={deleteProduct} className="btn-red">
              Delete
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
