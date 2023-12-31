import { useEffect, useState } from "react";
import { createContext } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from "../firebase/firebase.config"
import axios from "axios";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [login, setLogin] = useState(false);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signinUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }


    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    //observe on state change
    useEffect(() => {
        const unSubsCribe = onAuthStateChanged(auth, currentUser => {
            const useremail = currentUser?.email || user?.emil;
            const loggedUser = { email: useremail };
            setUser(currentUser);
            setLoading(false);

            if (currentUser) {
                axios.post("https://employee-management-server-omega.vercel.app/jwt", loggedUser, { withCredentials: true })
                    .then(res => {
                        console.log("token response", res.data);
                    })
            }
            // remove cookie
            else {
                axios.post('https://employee-management-server-omega.vercel.app/logout', loggedUser, { withCredentials: true })
                    .then(res => {
                        console.res(res.data);
                    })
            }
        })
        return () => {
            unSubsCribe();
        }
    }, [user?.emil])

    
    const authInfo = {
        user,
        createUser,
        signinUser,
        loading,
        logOut,
        login,
        setLogin,
        signInWithGoogle
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;