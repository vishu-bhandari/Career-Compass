import { Button } from 'flowbite-react'
import React from 'react'


export default function ScrollToTopButton() {
    const handleScrollToTop=()=>{
        window.scrollTo({
            top:0,
            behavior:'smooth'
        })
    }
  return (
   <>
    <Button gradientDuoTone='purpleToPink' onClick={handleScrollToTop} className=' fixed bottom-2 rounded-full ml-1 '>↑</Button>
   </>
  )
}
