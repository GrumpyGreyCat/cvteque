import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();
const BASE_URL = 'http://127.0.0.1:8000/api';

export function DataProvider({ children }) {
    const [data, setData] = useState({ students: [], cvs: [], jobs: [], partners: [], loading: true });
    
    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
    const fetchTable = (endpoint) => 
        fetch(`${BASE_URL}/${endpoint}`)
            .then(res => {
                if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);
                return res.json();
            })
            .catch(err => {
                console.error(`Impossible de charger l'endpoint /${endpoint}:`, err);
                return []; // Si l'endpoint plante, on renvoie un tableau vide plutôt que de tout casser !
            });

    Promise.all([
        fetchTable('students'),
        fetchTable('cvs'),
        fetchTable('jobs'),
        fetchTable('partners')
    ]).then(([students, cvs, jobs, schools]) => {
        console.log("Données chargées avec succès depuis Symfony :", { students, cvs, jobs, schools });
        
        setData({
            students: Array.isArray(students) ? students : [],
            cvs: Array.isArray(cvs) ? cvs : [],
            jobs: Array.isArray(jobs) ? jobs : [],
            partners: Array.isArray(schools) ? schools : [],
            loading: false
        });
    }).catch(globalError => {
        console.error("Erreur critique d'initialisation globale :", globalError);
        setData(prev => ({ ...prev, loading: false }));
    });
}, []);

    const loginUser = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setCurrentUser(userData);
    };

    const logoutUser = () => {
        localStorage.removeItem('user');
        setCurrentUser(null);
        fetch(`${BASE_URL}/logout`, { method: 'POST' }).catch(() => {});
    };

    return (
        <DataContext.Provider value={{ ...data, currentUser, loginUser, logoutUser }}>
            {children}
        </DataContext.Provider>
    );
}

export const useDatabase = () => useContext(DataContext);