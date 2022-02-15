import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React from "react";

import Home from "./components/HomeScreen";
import Cart from "./components/CartScreen";
import Setting from "./components/SettingScreen";

import Icon from "react-native-vector-icons/Feather";
import IconIos from "react-native-vector-icons/Ionicons";

const MainScreen = () => {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      activeColor="#E43A19"
      labelStyle={{ fontSize: 18, fontWeight: "bold" }}
      barStyle={{ backgroundColor: "#F2F4F7" }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarLabel: "Cart",
          tabBarIcon: ({ color }) => (
            <IconIos name="cart-outline" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarLabel: "Setting",
          tabBarIcon: ({ color }) => (
            <Icon name="align-right" color={color} size={22} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
