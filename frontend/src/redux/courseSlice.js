import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
    name: "course",
    initialState: {
        creatorCourseData: {
            courses: []   // << ✔ PROPER STRUCTURE
        },
        courseData: [],
        selectedCourseData: null
    },
    reducers: {
        setCreatorCourseData: (state, action) => {
            // Expecting full object { courses: [...] }
            state.creatorCourseData = action.payload;
        },

        setCourseData: (state, action) => {
            state.courseData = action.payload;
        },

        setSelectedCourseData: (state, action) => {
            state.selectedCourseData = action.payload;
        },

        updateCourseInList: (state, action) => {
            const updatedCourse = action.payload;

            // Find inside creatorCourseData.courses
            const index = state.creatorCourseData.courses.findIndex(
                c => c._id === updatedCourse._id
            );

            if (index !== -1) {
                state.creatorCourseData.courses[index] = updatedCourse;
            }
        }
    }
});

export const { 
    setCreatorCourseData, 
    setCourseData, 
    setSelectedCourseData, 
    updateCourseInList 
} = courseSlice.actions;

export default courseSlice.reducer;
