import React from 'react'
import Button from "../utilitycomponents/Button"
import { FaLongArrowAltRight } from "react-icons/fa";
const CodeTemplate = ({heading,
                    subheading,
                    ctabtn1,
                    ctabtn2
                    }) => {
  return (
    <div className=' m-10 p-4 mt-8 '>
        <div className='text-3xl font-bold'>
          {heading}
        </div>
        <div className=' text-richblack-200 pt-3'>
          {subheading}
        </div>
        
            <div className=' flex gap-8 mt-3'>
                <Button link={ctabtn1.link} isactive={ctabtn1.active}>
                  <div className='flex gap-1 items-center'>
                   {ctabtn1.btnText} <FaLongArrowAltRight/>
                  </div>
                </Button>
                <Button isactive={ctabtn2.active} link={ctabtn2.link}> 
                  Learn more
                </Button>
            </div>
    </div>
  )
}

export default CodeTemplate
