import React from "react"
import {
    AllProducts, Cart, Notification, Profile,
} from "../../containers/app"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomBottom from "../Bottom"
const Tab = createBottomTabNavigator();


const RenderBottomTab = () => {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomBottom {...props} />}
        >
            <Tab.Screen name="Home" component={AllProducts} options={{
                headerShown: false
            }} />
            <Tab.Screen name="Notification" component={Notification} options={{
                headerShown: false
            }} />
            <Tab.Screen name="Cart" component={Cart} options={{
                headerShown: false
            }} />
            <Tab.Screen name="Profile" component={Profile} options={{
                headerShown: false
            }} />
        </Tab.Navigator>
    )
}

export default RenderBottomTab