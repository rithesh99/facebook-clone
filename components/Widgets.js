import React from 'react'
import { 
    DotsHorizontalIcon,
    VideoCameraIcon,
    SearchIcon
} from "@heroicons/react/solid"
import Image from 'next/image'

function Widgets() {
    const contacts = [
        {
            src: "https://links.papareact.com/f0p", 
            name: "Jeff Bezoz"
        },
        {
            src: "https://links.papareact.com/kxk", 
            name: "Elon Musk"
        },
        {
            src: "https://links.papareact.com/zvy", 
            name: "Bill Gates"
        },
        {
            src: "https://links.papareact.com/snf", 
            name: "Mark Zuckerburg"
        },
        {
            src: "https://links.papareact.com/d0c", 
            name: "Harry Potter"
        },
        {
            src: "https://links.papareact.com/6gg", 
            name: "The Queen"
        },
        {
            src: "https://links.papareact.com/r57", 
            name: "James Bond"
        },
    ]

    return (
        <div className="hidden lg:flex flex-col w-60 p-2 mt-5">
            <div className="flex justify-between items-center text-gray-500 mb-5">
                <h2 className="text-xl">Contacts</h2>
                <div className="flex space-x-2">
                    <VideoCameraIcon className="h-6"/>
                    <SearchIcon className="h-6"/>
                    <DotsHorizontalIcon className="h-6"/>
                </div>
            </div>
            {contacts.map((contact,i) => (
                <div key={i} className="flex items-center space-x-3 mb-2 relative hover:bg-gray-200 cursor-pointer p-2">
                    <Image
                        className="rounded-full"
                        src={contact.src}
                        objectFit="cover"
                        width="50"
                        height="50"
                        layout="fixed"
                        alt=""
                    />
                    <p>{contact.name}</p>
                    {/* <div className="absolute bottom-2 left-7 bg-green-400 h-3 w-3 rounded-full animate-bounce"></div> */}
                    <div className="absolute bottom-2 left-7 bg-green-400 h-3 w-3 rounded-full"></div>
                </div> 
            ))}
        </div>
    )
}

export default Widgets
