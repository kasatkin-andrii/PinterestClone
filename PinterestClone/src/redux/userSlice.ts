import {createSlice} from '@reduxjs/toolkit'

export interface UserState {
  userId: string | null
  email: string | null
  username: string | null
  userImage: string | null
  pins: string[]
}

const initialState: UserState = {
  userId: null,
  email: null,
  username: null,
  userImage: null,
  pins: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId
      state.email = action.payload.email
      state.username = action.payload.username
      state.userImage = action.payload.userImage
      state.pins = action.payload.pins
    },
  },
})

// Action creators are generated for each case reducer function
export const {setUser} = userSlice.actions

export default userSlice.reducer
