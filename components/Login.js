import Image from 'next/image'
import React from 'react'
import { signIn } from 'next-auth/client'

function Login() {
    return (
        <div className="grid place-items-center pt-32">
            <Image
                src="https://links.papareact.com/t4i"
                alt=""
                height={400}
                width={400}
                objectFit="contain"
            />
            <button onClick={signIn}>
                <h1 className="p-5 bg-blue-500 rounded-full text-white text-center cursor-pointer">Login with Facebook</h1>
            </button>
        </div>
    )
}

export default Login
