import React, { useEffect } from "react";
import { SafeAreaView, Platform, StatusBar, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";

import MainPage from "./screens/MainScreen";
import Login from "./screens/LoginScreen";
import Register from "./screens/RegisterScreen";
import Started from "./screens/StartedScreen";
import EmptyCart from "./screens/components/Empty/CartEmpty";
import Sukses from "./screens/components/Sukses";

export default function App() {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#F2F4F7");
    } else {
      StatusBar.setBarStyle("dark-content");
    }
    //remove warning AsyngStorage
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F2F4F7",
        marginBottom: Platform.OS === "android" ? 0 : -35,
        paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Started"
            component={Started}
          />
          <Stack.Screen
            name="Login"
            options={{ headerShown: false }}
            component={Login}
          />
          <Stack.Screen
            name="Register"
            options={{ headerShown: false }}
            component={Register}
          />

          <Stack.Screen
            name="Main"
            options={{ headerShown: false }}
            component={MainPage}
          />

          <Stack.Screen
            name="EmptyCart"
            options={{ headerShown: false }}
            component={EmptyCart}
          />

          <Stack.Screen
            name="Sukses"
            options={{ headerShown: false }}
            component={Sukses}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
