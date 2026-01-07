import React, { Children } from 'react'
import { Link } from 'react-router-dom'

const Button = ({isactive, link, children }) => {
  return (
    <div>
      <Link to={link}>
      <div className= {` p-2 w-fit h-fit rounded-[6px]
       text-center font-bold ${isactive ? "bg-yellow-50 text-black " : "bg-richblack-800"}
       hover:scale-95 transition-all duration-200 `}>
        {children}
      </div>
      </Link>
    </div>
  )
}

export default Button
