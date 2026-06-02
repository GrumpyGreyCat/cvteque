import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();
const BASE_URL = 'http://127.0.0.1:8001/api';

export function DataProvider({ children }) {
    const [data, setData] = useState({ students: [], cvs: [], jobs: [], partners: [], loading: true });

    useEffect(() => {
        Promise.all([
            fetch(`${BASE_URL}/students`).then(res => res.json()),
            fetch(`${BASE_URL}/cvs`).then(res => res.json()),
            fetch(`${BASE_URL}/jobs`).then(res => res.json()),
            fetch(`${BASE_URL}/partners`).then(res => res.json()),
        ]).then(([students, cvs, jobs, partners]) => {
            setData({
                students: students.map(s => ({ ...s, skills: s.skills || [] })), // protect skills loop
                cvs,
                jobs,
                partners,
                loading: false
            });
        }).catch(err => {
            console.error("Database sync failed:", err);
            setData(prev => ({ ...prev, loading: false }));
        });
    }, []);

    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    );
}

export const useDatabase = () => useContext(DataContext);