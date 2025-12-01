import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },

    addEnrolledCourse: (state, action) => {
      if (state.userData && state.userData.user) {
        if (!Array.isArray(state.userData.user.enrolledCourses)) {
          state.userData.user.enrolledCourses = [];
        }

        if (!state.userData.user.enrolledCourses.includes(action.payload)) {
          state.userData.user.enrolledCourses.push(action.payload);
        }
      }
    },
  }
});

export const { setUserData, addEnrolledCourse } = userSlice.actions;
export default userSlice.reducer;
