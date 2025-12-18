import { createSlice } from "@reduxjs/toolkit";


const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        searchedJobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery: "",
        // Add separate states for different filter types
        locationFilter: "",
        industryFilter: "",
        salaryFilter: ""
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload || [];
        },
        setSearchedJobs: (state, action) => {
            state.searchedJobs = action.payload || [];
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
        // New reducers for specific filters
        setLocationFilter: (state, action) => {
            state.locationFilter = action.payload;
        },
        setIndustryFilter: (state, action) => {
            state.industryFilter = action.payload;
        },
        setSalaryFilter: (state, action) => {
            state.salaryFilter = action.payload;
        },
        // Clear all filters
        clearFilters: (state) => {
            state.searchedQuery = "";
            state.locationFilter = "";
            state.industryFilter = "";
            state.salaryFilter = "";
        }
    }
});

export const {
    setAllJobs,
    setSearchedJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchedQuery,
    setLocationFilter,
    setIndustryFilter,
    setSalaryFilter,
    clearFilters
} = jobSlice.actions;
export default jobSlice.reducer;