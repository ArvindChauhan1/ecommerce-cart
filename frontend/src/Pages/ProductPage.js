import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { http } from '../remote'
import { handleAddtoCart, handleRemovefromCart } from './cart'


const ProductPage = () => {

  const [product, setProduct] = useState([])
  const [cart, setCart] = useState([])

  const fetchProduct = useCallback(async () => {
    const resp = await http.get('/product')
    setProduct(resp.data !== undefined ? resp.data.product : [])
  }, [setProduct])

  const fetchCart = useCallback(async () => {
    const resp = await http.get('/cart')
    setCart(resp.data !== undefined ? resp.data.cart : [])
  }, [setCart])

  useEffect(() => {
    fetchProduct()
    fetchCart()
  }, [fetchProduct, fetchCart])


  return (
    <div className='p-4 py-8 sm:p-14 md:p-28 text-base font-medium'>
      <div className='my-8 text-3xl text-indigo-800 font-bold tracking-wider'>
        Products
      </div>
      <div className=''>
        {product.map((p, i) => {
          const c = cart.find(c => c.product_id === p._id) === undefined ? { quantity: 0 } : cart.find(c => c.product_id === p._id);
          return (
            <>
              <div className='p-4 m-4 flex justify-between'>
                <span className='flex items-center w-20 h-20'>
                  <Link to={`update-product&${p._id}`}>
                    <span className='inline-block m-5'>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </span>
                  </Link>
                  <img className='' src={p.image.url} alt='p image' /></span>
                <div className='ml-6'>
                  <div className=''>{p.name}</div>
                  <div className='text-sm font-normal mt-4'>{`₹ ${p.price}`}</div>
                </div>
                <div className='flex flex-col justify-evenly items-end'>
                  <span>
                    <button className='px-1 py-1 bg-indigo-700 text-xs font-thin text-white rounded-lg hover:shadow-lg transition-shadow ease-in' onClick={() => handleAddtoCart(p._id, fetchCart)}>
                      add to cart
                    </button>
                    <span>
                      {`{${c.quantity}}`}
                    </span>
                  </span>
                  <button disabled={c.quantity === 0} className={`px-1 py-1 bg-red-700 text-xs font-thin text-white rounded-lg hover:shadow-lg transition-shadow ease-in ${c.quantity === 0 ? "cursor-not-allowed" : ""}`} onClick={() => handleRemovefromCart(p._id, fetchCart)}>
                    remove
                  </button>
                </div>
              </div>
            </>
          )
        })}
      </div>
    </div>
  )
}

export default ProductPage