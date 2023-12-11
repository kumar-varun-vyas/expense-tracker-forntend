import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { menuItems } from '../../utils/menuItems';

const Sidebar = () => {
    const [active, setActive] = useState(localStorage.getItem('active') ? localStorage.getItem('active') : 1)
    const activeLink = "py-2 w-[94%] bg-indigo-200 rounded m-2  text-lg text-indigo-500 flex flex-col justify-center items-center  hover:text-indigo-600"
    const normalLink = "py-2 w-[94%] border rounded m-2  text-lg text-indigo-500 flex flex-col justify-center items-center hover:bg-indigo-100 hover:text-indigo-600"
    const fullName = localStorage.getItem('userAuth') ? JSON.parse(localStorage.getItem('userAuth')).fullname : ""

    const clickHandel = (item) => {
        setActive(item)
        localStorage.setItem("active", item)

    }
    return (
        <>
            <div className=' w-64 h-[85vh] flex flex-col  '>


                <div className='flex items-center justify-center flex-col py-5 space-y-2' >

                    <h2 className=' text-lg text-indigo-500'>
                        Manage by
                    </h2>
                    <h2 className='font-bold text-2xl text-gray-600'>
                        {fullName}
                    </h2>

                </div>
                <div >

                    <ul >
                        {menuItems.map((item) => {
                            return <NavLink to={item.link} onClick={() => clickHandel(item.id)} > <li
                                key={item.id}
                                className={active == item.id ? activeLink : normalLink}

                            >

                                {item.icon}
                                <span >
                                    {item.title}
                                </span>

                            </li></NavLink>
                        })}
                    </ul>

                </div>

            </div>
        </>
    );
};

export default Sidebar;