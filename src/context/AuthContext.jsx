import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

import useAxios from '../hooks/useAxios';
import auth from '../firebase/firebase.config';
export const UserProvider = createContext(null)

const AuthContext = ({ children }) => {
    const axiosData = useAxios()
    const [user, setUser] = useState({})
    const [loader, setLoader] = useState(true)
    const [userPhoto, setUserPhoto] = useState({})
    const provider = new GoogleAuthProvider();
    const [search, setSearch] = useState('');

    const googleSignIn = () => {
        setLoader(true)
        return signInWithPopup(auth, provider)
    }

    const createUser = (email, password) => {
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn = (email, password) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logOut = () => {
        setLoader(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            if (user) {
                const userEmail = { email: user.email };
                const userData = {
                    email: user.email,
                    img: user.photoURL,
                    name: user.displayName
                }
                axiosData.post(`/user`, userData)
                    .then(res => {

                    })

                axiosData.post('/jwt', userEmail)
                    .then((res) => {
                        if (res.data.token) {
                            localStorage.setItem('Token', res.data.token)
                        }
                    })
            } else {
                localStorage.removeItem('Token')
            }
            setLoader(false)
        });
        return () => {
            return unSubscribe()
        }
    }, [])

    const sendValue = {
        createUser,
        signIn,
        logOut,
        googleSignIn,
        user,
        loader,
        setUserPhoto,
        userPhoto,
        search,
        setSearch
    }

    return (
        <UserProvider.Provider value={sendValue}>
            {children}
        </UserProvider.Provider>
    );
};

export default AuthContext;