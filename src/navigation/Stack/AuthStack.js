import React from "react"
import { createStackNavigator } from '@react-navigation/stack';
import {
    LogIn,
    Register,
    ValidateCode
} from "../../containers/auth"
const Stack = createStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="LogIn"
                component={LogIn}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen name="Register" component={Register} options={{
                headerShown: false
            }} />
            <Stack.Screen name="ValidateCode" component={ValidateCode} options={{
                headerShown: false
            }} />
        </Stack.Navigator>
    );
}

export default AuthStack