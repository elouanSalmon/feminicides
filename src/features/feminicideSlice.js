import { createSlice } from '@reduxjs/toolkit';
import feminicideData from '../../data.json';

const initialState = {
  cases: feminicideData.map(caseItem => ({
    ...caseItem,
    latitude: caseItem.lat,
    longitude: caseItem.lng
  })),
  filters: {
    dateRange: {
      start: null,
      end: null,
    },
    department: '',
    city: '',
  },
  filteredCases: feminicideData.map(caseItem => ({
    ...caseItem,
    latitude: caseItem.lat,
    longitude: caseItem.lng
  })),
  status: 'succeeded'
};

export const feminicideSlice = createSlice({
  name: 'feminicide',
  initialState,
  reducers: {
    setDateRange: (state, action) => {
      state.filters.dateRange = action.payload;
      state.filteredCases = applyFilters(state.cases, state.filters);
    },
    setDepartment: (state, action) => {
      state.filters.department = action.payload;
      state.filteredCases = applyFilters(state.cases, state.filters);
    },
    setCity: (state, action) => {
      state.filters.city = action.payload;
      state.filteredCases = applyFilters(state.cases, state.filters);
    }
  }
});

const applyFilters = (cases, filters) => {
  return cases.filter(caseItem => {
    const matchesDate = !filters.dateRange.start || !filters.dateRange.end || 
      (new Date(caseItem.date) >= new Date(filters.dateRange.start) &&
       new Date(caseItem.date) <= new Date(filters.dateRange.end));

    const matchesAge = !filters.age ||
      caseItem.age === filters.age;

    const matchesCity = !filters.city || 
      caseItem.city.toLowerCase().includes(filters.city.toLowerCase());

    return matchesDate && matchesDepartment && matchesCity;
  });
};

export const { setDateRange, setDepartment, setCity } = feminicideSlice.actions;
export default feminicideSlice.reducer;