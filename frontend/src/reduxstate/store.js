import { configureStore } from '@reduxjs/toolkit'
import  AuthReduser from './slices/authslice'
import ProfileReduser from './slices/profileslice'
import CartReduser  from './slices/cartslice'
import CourseReduser from './slices/courseSlice'

export const store = configureStore({
  reducer: {
    auth: AuthReduser,
    profile: ProfileReduser,
    cart:CartReduser,
    course:CourseReduser,


    
  },
})