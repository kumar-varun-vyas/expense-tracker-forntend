import React, { useContext, useState } from "react"

function NavPage(props) {


    return (
        <div className=' w-full h-[85vh] '>
            <div className="App border-2  h-[85vh]">
                {props.children}

            </div>
        </div>
    );
}

export default NavPage;
