import React, { createContext, useContext, useState, useEffect } from "react";
import * as AuthSessions from 'expo-auth-session';
import { api } from '../services/api';
import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_STORAGE = '@nlwheat:user';
const TOKEN_STORAGE = '@nlwheat:token';

type User ={
    id: string;
    avatar_url: string;
    name: string;
    login: string;
}

type AuthContextData ={
    user: User | null;
    isSigningIn: boolean;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
}

//definindo que o que a função vai receber é um componente react
type AuthProviderProps = {
    children: React.ReactNode
}

//definindo a resposta da autenticação
type AuthResponse = {
    token: string;
    user: User;
}

//código retornado se credenciais funcionarem
type AuthorizationResponse = {
    params: {
        code?: string;
        error?: string
    },
    type?: string
}

export const AuthContext = createContext({} as AuthContextData)

function AuthProvider ({ children } : AuthProviderProps) {
    const [isSigningIn, setIsSigningIn] = useState(true)
    const [user, setUser] = useState<User | null>(null)

    const CLIENT_ID = '14838166f016eae2cee0';
    const SCOPE = 'read:user';
    
    async function signIn() {
        try {
            setIsSigningIn(true);
            const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`
            const authSessionResponse = await AuthSessions.startAsync({authUrl}) as AuthorizationResponse
            
            //verifica se retornou sucesso e se o usuário permitiu o compartilhamento de dados
            if(authSessionResponse.type === 'success' && authSessionResponse.params.error !== 'access_denied'){
                //se houver um código na url como parâmetro o authResponse pega o código e envia
                //para o lado da API na rota authenticate
                const authResponse = await api.post('authenticate', {code: authSessionResponse.params.code})
                //depois de recebidos, distribuir os dados dos tipos especificados nas constantes
                const { user, token } = authResponse.data as AuthResponse;
            
                //colocando o token na header de todas as requisições do usuário
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`
                await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
                await AsyncStorage.setItem(TOKEN_STORAGE, token);

                setUser(user);
            }
        } catch (err) {
            console.log(err)
        } finally {
            setIsSigningIn(false)
        }

    }

    async function signOut() {
        setUser(null);
        await AsyncStorage.removeItem(USER_STORAGE);
        await AsyncStorage.removeItem(TOKEN_STORAGE);

        
    }

    useEffect(() => {
        async function loadUserStorageData() {
            const userStorage = await AsyncStorage.getItem(USER_STORAGE);
            const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE);

            if(userStorage && tokenStorage){
                api.defaults.headers.common['Authorization'] = `Bearer ${tokenStorage}`
                setUser(JSON.parse(userStorage))
            }

            setIsSigningIn(false);
        }

        loadUserStorageData();
    })

    return(
        <AuthContext.Provider value={{
            signIn,
            signOut,
            user,
            isSigningIn
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)

    return context;
}

export {
    AuthProvider,
    useAuth
    
}