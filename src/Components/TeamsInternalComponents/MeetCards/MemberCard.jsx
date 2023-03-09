import React from 'react'
import { Link } from 'react-router-dom'
import grp_icon from "../../../Images/grp_icon.jpg"

const MemberCard = (props) => {
    return (
        <>
        <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            <article className="overflow-hidden rounded-lg border-2 hover:shadow-xl">
                <footer className="flex items-center leading-none p-2 md:p-4">
                    <a className="flex items-center no-underline hover:underline text-black mx-2" href="#">
                        <img alt="Placeholder" className="block rounded-full h-auto w-auto" src="https://picsum.photos/32/32/?random"/>
                    </a>
                    <div className='pl-1'>
                        <p className="ml-1 text-sm font-semibold">
                                {props.name}
                        </p>
                        <p className="ml-1 text-sm">
                                Role: {props.role}
                        </p>
                        <p className="ml-1 text-sm">
                                Email: {props.email}
                        </p>
                    </div>
                </footer>
            </article>

        </div>
        

        </>
    )
}

export default MemberCard