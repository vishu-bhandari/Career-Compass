import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'

export default function OAuth() {
    const handleGoogleClick =()=>{
        
    }

  return (
    <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick} >
    <AiFillGoogleCircle className='w-5 h-5 mr-2 '/> Continue With Google</Button>
  )
}
