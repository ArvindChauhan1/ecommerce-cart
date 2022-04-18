import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <div className="bg-indigo-600 text-sm sm:text-base font-medium text-white tracking-wider">
                <span>
                    <Link to='./'>
                        <span className="inline-block p-4 hover:bg-indigo-700 cursor-pointer">
                            Home
                        </span>
                    </Link>
                    <Link to='/cart'>
                        <span className="inline-block p-4 hover:bg-indigo-700 cursor-pointer">
                            Cart
                        </span>
                    </Link>
                </span>
            </div>
        </>
    )
}

export default Header