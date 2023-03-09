import React from 'react'
import GoToTop from '../GoToTop'
import NavbarCoponent from '../NavbarComponet/NavbarCoponent'
import NewCard from '../NavbarComponet/NewCard'
import SecondNav from '../NavbarComponet/SecondNav'
import SideBarComponent from '../SideBarComponent/SideBarComponent'

const Second = () => {
    return (
        <div>
            <NavbarCoponent />

            <div>
                <SideBarComponent />
            </div>
            <div className="ml-[90px] sm:ml-[100px] mt-[60px] grid-cols-1 ">
                <div ><SecondNav /></div>
                <div className=" justify-center items-center md:my-[27px] grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  px-3">
                    <NewCard />
                    <NewCard />
                    <NewCard />
                    <NewCard />
                    <NewCard />
                    <NewCard />
                    <NewCard />
                    <NewCard />
                    <NewCard />
                    <NewCard />
                    <NewCard />
                    <NewCard />
                </div>
            </div>

            <GoToTop />
        </div>
    )
}

export default Second