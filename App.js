import { SafeAreaView, Platform, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-gesture-handler";

import MainPage from "./screens/MainScreen";
import Login from "./screens/LoginScreen";
import Register from "./screens/RegisterScreen";
import Started from "./screens/StartedScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F2F4F7",
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
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
