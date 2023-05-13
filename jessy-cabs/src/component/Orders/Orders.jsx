import React from 'react'
import "./Orders.css"
import { Link, Outlet } from 'react-router-dom'

const Orders = () => {
    return (
        <>
            <div className='order-conatiner'>
                <div className="menu-bar">
                    <Link className='menu-link' to='/home/orders/customer'>
                        Customer Master
                    </Link>
                    <Link className='menu-link' to='/home/orders/supplier'>
                        Supplier Master
                    </Link>
                    <Link className='menu-link' to='/home/orders/booking'>
                        Booking
                    </Link>
                    <Link className='menu-link' to='/home/orders/tripsheet'>
                        Trip Sheet
                    </Link>
                </div>
                <Outlet />
            </div>
        </>
    )
}

export default Orders