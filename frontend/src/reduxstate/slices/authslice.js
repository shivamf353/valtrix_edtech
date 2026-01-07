import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")):null,
  loading:false,
   signupData: null,
}

export const authSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state ,value) => {
      state.token=value.payload;
    },
    setLoading: (state ,value) => {
      state.loading=value.payload;
    },
    setSignupData: (state ,value) => {
      state.signupData=value.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLoading, setToken ,setSignupData,} = authSlice.actions

export default authSlice.reducer