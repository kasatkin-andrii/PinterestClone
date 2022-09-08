import {createSlice} from '@reduxjs/toolkit'

export interface UserState {
  id: string | null
  email: string | null
  displayName: string | null
  photoUrl: string | null
}

const initialState: UserState = {
  id: null,
  email: null,
  displayName: null,
  photoUrl: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id
      state.email = action.payload.email
      state.displayName = action.payload.displayName
      state.photoUrl = action.payload.photoUrl
    },
  },
})

// Action creators are generated for each case reducer function
export const {setUser} = userSlice.actions

export default userSlice.reducer
