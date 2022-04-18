import React, { useState, useEffect, useCallback } from 'react'
import { http } from '../remote'
import { handleAddtoCart, handleRemovefromCart } from './cart'

const CartPage = () => {

  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)

  const fetchCart = useCallback(async () => {
    const resp = await http.get('/cart')
    setCart(resp.data !== undefined ? resp.data.cart : [])
    let total = 0
    if (resp.data !== undefined) {
      resp.data.cart.forEach(e => {
        total += e.quantity * e.product.price
      })
    }
    setTotal(total)
  }, [setCart])

  useEffect(() => {
    fetchCart()
  }, [fetchCart])


  return (
    <>
      <div className='p-4 py-8 sm:p-14 md:p-28 text-base font-medium'>
        <div className='my-8 text-3xl text-indigo-800 font-bold tracking-wider'>
          Cart
        </div>
        <div className=''>
          {cart.map((c, i) => {
            const p = c.product
            return (<>
              <div className='p-4 m-4 flex justify-between'>
                <span className='inline-block w-20 h-20 border-2'><img className='' src={p.image.url} alt='p image' /></span>
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
            </>)
          })}
        </div>
        <div className='p-5'>
          {/* {} */}
          <span>Total Price :  </span>
          <span>{total}</span>
        </div>
      </div>
    </>
  )
}

export default CartPage