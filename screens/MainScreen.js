import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { authentication } from "../firebase/Config";
import { useNavigation } from "@react-navigation/native";

import styles from "../styles/Styles";

import Home from "./components/HomeScreen";
import Cart from "./components/CartScreen";
import Setting from "./components/SettingScreen";

const MainScreen = () => {
  const Tab = createBottomTabNavigator();

  const navigation = useNavigation();
  const handleSignOut = () => {
    authentication
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Setting" component={Setting} />
    </Tab.Navigator>
  );
};

export default MainScreen;
