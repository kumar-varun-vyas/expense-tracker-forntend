import React from 'react'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import NavPage from '../NavPage/NavPage'

const MainPage = () => {
    return (
        <>
            {/* <section>
                <div>
                    <Navbar />
                </div>
            </section> */}
            <section className='h-[83vh]' >
                <div className='p-3 '>
                    <div className='flex justify-start p-4 '  >
                        <div className='border-2   mr-2'>
                            <Sidebar />
                        </div>
                        <div className=' w-full h-[85vh] '>
                            <NavPage />
                        </div>

                    </div>
                </div>
            </section >
            <section>

            </section>
        </>

    )
}

export default MainPage