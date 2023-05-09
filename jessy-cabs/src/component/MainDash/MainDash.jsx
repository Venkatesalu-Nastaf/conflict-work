import React from 'react';
import '../../Style/MainDash.css';
import Cards from '../Cards/Cards';
import Table from '../Table/Table';
const MainDash = () => {
    return (
        <div className='MainDash'>
            <div className="MainDash">
                <h1>Dashboard</h1>
                <Cards/>
                <h1>Area Chart</h1>
                <Table/>
            </div>
        </div>
    )
}

export default MainDash