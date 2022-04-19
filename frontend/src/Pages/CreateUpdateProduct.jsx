import React, { useState, useEffect, useCallback } from 'react'
import { http } from '../remote'
import { useNavigate, useParams } from 'react-router'

const UpdateProduct = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(id === undefined ? false : true)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [image, setImage] = useState({ url: '', id: 0 })

    const fetchProduct = useCallback(async () => {
        const resp = await http.get(`/product/${id}`)
        setName(resp.data !== undefined ? resp.data.product.name : [])
        setPrice(resp.data !== undefined ? resp.data.product.price : 0)
        setDescription(resp.data !== undefined ? resp.data.product.description : [])
        setImage(resp.data !== undefined ? resp.data.product.image : { url: '', id: 0 })
        setLoading(false)
    }, [setName, setPrice, setDescription, setImage])

    useEffect(() => {
        if (id !== undefined) fetchProduct()
    }, [fetchProduct])


    const handleSubmit = async () => {


        if (price === 0) {
            alert('Price cannot be zero')
            return
        }

        const data = {
            name,
            description,
            price: parseInt(price),
            image: {
                id: 1,
                url: "https://picsum.photos/400"
            }
        }


        if (id !== undefined) {
            http.put(`/product/${id}`, data).then(() => {
                alert("Product Updated")
                navigate('../')
            }).catch((e) => console.log(e))
        } else {
            http.post(`/product/create`, data).then(() => {
                alert("Product Created")
                navigate('../')
            }).catch((e) => console.log(e))
        }
    }

    return (
        <>
            {loading ? "" :
                <>
                    <div className='p-4 py-8 sm:p-14 md:p-28 text-base font-medium'>
                        <div className='my-8 text-3xl text-indigo-800 font-bold tracking-wider'>
                            Product Update
                        </div>
                        <div>
                            <div className='m-4'>
                                Name :<span className='ml-3'><input className='outline-1 border-2 border-black' type={'text'} value={name} onChange={({ target: { value } }) => setName(value)} /></span>
                            </div>
                            <div className='m-4 flex items-start'>
                                Description :<span className='ml-3'><textarea className='outline-1 border-2 border-black' type={'text'} value={description} onChange={({ target: { value } }) => setDescription(value)} /></span>
                            </div>
                            <div className='m-4'>
                                Price :<span className='ml-3'><input className='outline-1 border-2 border-black' type={'text'} value={price} onChange={({ target: { value } }) => setPrice(value)} /></span>
                            </div>
                        </div>
                        <button className='px-8 py-2 bg-indigo-700 text-base font-medium text-white rounded-lg hover:shadow-lg transition-shadow ease-in' onClick={() => {
                            handleSubmit()
                        }}>
                            save
                        </button>
                    </div>
                </>
            }
        </>
    )
}

export default UpdateProduct