const { createSlice } = require("@reduxjs/toolkit");

// const initialState = {
//   user: null,
// };
const userSlice = createSlice({
  name: "user",
  initialState:null,
  reducers: {
    setUser: (state, action) => {
      return action.payload; //store user object 
    },
    clearUser:(state)=>{
        return null; // remove user on logout
    }
  },
});

export const {setUser,clearUser} = userSlice.actions;
export default userSlice.reducer;