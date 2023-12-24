import React, { Children, useContext } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import NavPage from '../NavPage/NavPage'

const MainPage = (props) => {

    return (
        <>
            <section className='h-[83vh]' >
                <div className='p-3 '>
                    <div className='flex justify-start p-4 '  >
                        <div className='border-2   mr-2'>
                            <Sidebar />
                        </div>

                        <NavPage path={props.path} >
                            {props.children}
                        </NavPage>

                    </div>
                </div>
            </section >

        </>

    )
}

export default MainPage