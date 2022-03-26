import React from "react"
import { createStackNavigator } from '@react-navigation/stack';
import RenderBottomTab from "../Bottom/Home";
import { ProductDetail } from "../../containers/app"

const Stack = createStackNavigator();



function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={RenderBottomTab} options={{
        headerShown: false
      }} />
      {/* <Stack.Screen name="ProductDetail" component={ProductDetail} /> */}
    </Stack.Navigator>
    // <Tab.Navigator
    //   tabBar={(props) => <CustomBottom {...props} />}
    // >
    //   <Tab.Screen name="Home" component={AllProducts} />
    //   <Tab.Screen name="Homex" component={AllProducts} />
    //   <Tab.Screen name="Homey" component={AllProducts} />
    //   <Tab.Screen name="Homez" component={AllProducts} />
    //   <Tab.Screen name="ProductDetail" component={ProductDetail} />
    // </Tab.Navigator>
  );
}

export default AppStack