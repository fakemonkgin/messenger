import React from 'react'
import { getProviders } from "next-auth/react"
import Image from 'next/image'
import SignInComponent from './SignInComponent'

async function SignInPage() {
  const providers = await getProviders()
  return (
    <div className='grid justify-center'>
        <div>
            <Image
                className='object-cover mx-2 rounded-full'
                width={700}
                height={700}
                src="https://links.papareact.com/161"
                alt='pic'
            />
        </div>
        
        <SignInComponent providers={providers} />
    </div>
  )
}

export default SignInPage