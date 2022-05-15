import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './Stack/AuthStack';
import AppStack from './Stack/AppStack';
import { AppContext } from '../context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Navigation() {

    const context = useContext(AppContext)
    const { user, setUser } = context
    console.log(user, "UU");

    useEffect(() => {
        getUserDetails()
    }, [])

    const getUserDetails = async () => {
        const userData = await AsyncStorage.getItem("userData")
        console.log(userData, "userDatauserDatauserData");
        if (userData != null) {
            setUser(JSON.parse(userData))
        }
    }

    return (
        <NavigationContainer>
            {user != null ?
                <AppStack />
                :
                <AuthStack />
            }
        </NavigationContainer>
    );
}