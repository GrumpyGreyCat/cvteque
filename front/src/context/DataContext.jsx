import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const DataContext = createContext();
const BASE_URL = 'http://127.0.0.1:8000/api';

export function DataProvider({ children }) {
    // On initialise loading à true par défaut
    const [data, setData] = useState({ students: [], cvs: [], jobs: [], partners: [], loading: true });
    
    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Version ultra-stable de refreshData sans provoquer de boucle infinie sur l'état
    const refreshData = useCallback(() => {
        const fetchTable = (endpoint) => 
            fetch(`${BASE_URL}/${endpoint}`)
                .then(res => {
                    if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);
                    return res.json();
                })
                .catch(err => {
                    console.error(`Impossible de charger l'endpoint /${endpoint}:`, err);
                    return []; // Renvoie un tableau vide pour ne pas faire cracher Promise.all
                });

        Promise.all([
            fetchTable('students'),
            fetchTable('cvs'),
            fetchTable('jobs'),
            fetchTable('schools')
        ])
        .then(([students, cvs, jobs, schools]) => {
            console.log("Données rafraîchies depuis Symfony :", { students, cvs, jobs, schools });
            
            // On met à jour toutes les données d'un seul coup à la fin de la promesse
            setData({
                students: Array.isArray(students) ? students : [],
                cvs: Array.isArray(cvs) ? cvs : [],
                jobs: Array.isArray(jobs) ? jobs : [],
                partners: Array.isArray(schools) ? schools : [],
                loading: false // Fin du chargement global
            });
        })
        .catch(globalError => {
            console.error("Erreur critique d'initialisation globale :", globalError);
            setData(prev => ({ ...prev, loading: false }));
        });
    }, []); // Tableau de dépendances vide -> la fonction n'est créée QU'UNE SEULE FOIS

    // Charger les données une seule fois au montage initial du composant
    useEffect(() => {
        refreshData();
    }, [refreshData]);

    const loginUser = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setCurrentUser(userData);
    };

    const logoutUser = () => {
        localStorage.removeItem('user');
        setCurrentUser(null);
    };

    return (
        <DataContext.Provider value={{ ...data, currentUser, loginUser, logoutUser, refreshData }}>
            {children}
        </DataContext.Provider>
    );
}

export const useDatabase = () => useContext(DataContext);