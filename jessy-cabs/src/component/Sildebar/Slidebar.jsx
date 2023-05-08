// import React from 'react';
import React, { useState } from "react";
import '../../Style/Sidebar.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/img/logo.png'
import { Sidebardata } from '../../Data/Data'
import { FiLogOut } from "@react-icons/all-files/fi/FiLogOut";
import { AiOutlineBars } from "@react-icons/all-files/ai/AiOutlineBars";
import { motion } from "framer-motion";
const Sidebar = () => {
    const [selected, setSelected] = useState(0);

    const [expanded, setExpaned] = useState(true);

    const sidebarVariants = {
        true: {
            left: '0'
        },
        false: {
            left: '-60%'
        }
    }
    const navigate = useNavigate();
    const [logout, setlogout] = useState(false)
    React.useEffect(() => {
        if (!localStorage.getItem('auth')) navigate('/login');
    }, [logout]);

    const logouHandler = (e) => {
        e.preventDefault();
        if (!localStorage.removeItem('auth'));
        setlogout(true);
    }
    console.log(window.innerWidth)
    return (
        <>
            <div className="bars" style={expanded ? { left: '60%' } : { left: '5%' }} onClick={() => setExpaned(!expanded)}>
                <AiOutlineBars />
            </div>
            <motion.div className='sidebar'
                variants={sidebarVariants}
                animate={window.innerWidth <= 768 ? `${expanded}` : ''}
            >
                {/* logo */}
                <div className="logo">
                    <img src={Logo} alt="logo" />
                </div>

                <div className="menu">
                    {Sidebardata.map((item, index) => {
                        return (
                            <div
                                className={selected === index ? "menuItem active" : "menuItem"}
                                key={index}
                                onClick={() => setSelected(index)}
                            >
                                <item.icon />
                                <span>{item.heading}</span>
                            </div>
                        );
                    })}
                    {/* signoutIcon */}
                    <div className="menuItem">
                        <FiLogOut onClick={logouHandler} />
                </div>
            </div>
        </motion.div >
        </>
    )
}

export default Sidebar