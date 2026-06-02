import { useDatabase } from '../context/DataContext';

/**
 * Custom hooks that intercept your old variable names 
 * and return live database states instantly
 */
export const useMockStudents = () => useDatabase().students;
export const useMockCvs = () => useDatabase().cvs;
export const useMockJobs = () => useDatabase().jobs;
export const useMockPartners = () => useDatabase().partners;
export const useIsDatabaseLoading = () => useDatabase().loading;