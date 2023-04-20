import Layout from '@/components/Layout'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { withSwal } from 'react-sweetalert2'

function Categories({ swal }) {
  const [editedCategory, setEditedCategory] = useState(null)
  const [name, setName] = useState('')
  const [categories, setCategories] = useState([])
  const [parentCategory, setParentCategory] = useState('')
  const [properties, setProperties] = useState([])

  useEffect(() => {
    fetchCategories()
  }, [])

  function fetchCategories() {
    axios.get('api/categories').then((result) => {
      setCategories(result.data)
    })
  }

  async function saveCategory(ev) {
    ev.preventDefault()
    const data = { name, parentCategory }
    if (editedCategory) {
      data._id = editedCategory._id
      await axios.put('/api/categories', data)
      setEditedCategory(null)
    } else {
      await axios.post('/api/categories', data)
    }
    setName('')
    fetchCategories()
  }

  function editCategory(category) {
    setEditedCategory(category)
    setName(category.name)
    setParentCategory(category.parent?._id)
  }
  function deleteCategory(category) {
    swal
      .fire({
        title: 'Are you sure?',
        text: `Do you want to delete ${category.name}`,
        showCancelButton: true,
        cancleButtonText: 'Cancle',
        confirmButtonText: 'Delete',
        reverseButtons: true,
        confirmButtonColor: '#f52525',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = category
          await axios.delete('/api/categories?_id=' + _id)
          fetchCategories()
        }
      })
  }

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: '', values: '' }]
    })
  }
  return (
    <Layout>
      <div className="w-full h-full flex flex-col ">
        <div className="p-7 max-h-15 text-2xl flex justify-between ">
          <h2>Categories</h2>
        </div>
        <div className="flex justify-around w-full h-5/6 border-solid border-t-2 border-gray-700">
          <div className=" w-1/3 p-5 pl-7 text-bold border-solid border-r-2 border-gray-700 overflow-scroll scrollbar scrollbar-thumb-gray-700 scrollbar-track-gray-900 scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-transparent">
            <h3>Base Information</h3>
            <h3 className="pt-5 font-bold text-xl">
              {editedCategory
                ? `Edit Category ${editedCategory.name}`
                : 'Add New Category'}
            </h3>
            <div className="mt-3 flex flex-col text-sm p-3 space-y-2">
              <label
                for="default-input"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category Name
              </label>
              <input
                type="text"
                id="caterory_name"
                class=""
                placeholder="Cloathing"
                required
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
              <label
                for="default-input"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Parent Category Name
              </label>
              <select
                value={parentCategory}
                onChange={(ev) => setParentCategory(ev.target.value)}
                id="countries"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="" selected>
                  No parent category
                </option>
                {categories.length > 0 &&
                  categories.map((category) => (
                    <option value={category._id}>{category.name}</option>
                  ))}
              </select>
              <div className="flex flex-col gap-y-2">
                <button
                  onClick={addProperty}
                  className="h-7 w-full 00 bg-blue-500 rounded-md "
                >
                  Add New Property
                </button>
                {properties.length > 0 ? (
                  <div className="flex justify-between italic">
                    <label
                      for="default-input"
                      class="block mb-2 w-1/2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Property Name
                    </label>
                    <label
                      for="default-input"
                      class="block mb-2 w-1/2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Values
                    </label>
                  </div>
                ) : null}
                {properties.length > 0 &&
                  properties.map((property) => (
                    <div className="flex gap-1">
                      <input
                        value={property.name}
                        type="text"
                        class=""
                        placeholder="Colors..."
                        required
                      />
                      <input
                        type="text"
                        value={property.values}
                        placeholder="Color_1, Color_2"
                        required
                      />
                      <button class="font-medium hover:underline text-red-400 hover:text-red-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
              </div>
              <div
                className="text-sm space-x-2 pt-5 
              "
              >
                <button
                  type="submit"
                  className="h-10 w-24 00 bg-blue-600 rounded-md "
                  onClick={saveCategory}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 w-2/3 p-5 space-y-2 overflow-scroll scrollbar scrollbar-thumb-gray-700 scrollbar-track-gray-900 scrollbar-thin scrollbar-thumb-rounded-md scrollbar-track-transparent">
            <h2 className="pb-5">Categories</h2>

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Caterory
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Parent Category
                    </th>
                    <th scope="col" class="px-6 py-3">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.length > 0 &&
                    categories.map((category) => (
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {category.name}
                        </th>
                        <td class="px-6 py-4">{category?.parent?.name}</td>

                        <td class="px-6 py-4 text-right space-x-2 text-blue-500 ">
                          <button
                            onClick={() => editCategory(category)}
                            class="font-medium  hover:underline 0"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteCategory(category)}
                            class="font-medium hover:underline text-red-400 hover:text-red-500"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default withSwal(({ swal }, ref) => <Categories swal={swal} />)
