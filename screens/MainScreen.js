// import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { AnimatedTabBarNavigator } from "react-native-animated-nav-tab-bar";
import React from "react";

import Home from "./components/HomeScreen";
import Cart from "./components/CartScreen";
import Account from "./components/AccountScreen";
import Transaksi from "./components/transaksi";
import HeaderScreen from "./components/header/HeaderScreen";

import Icon from "react-native-vector-icons/Feather";
import IconIos from "react-native-vector-icons/Ionicons";

const MainScreen = () => {
  // const Tab = createMaterialBottomTabNavigator();
  const Tab = AnimatedTabBarNavigator();

  return (
    <>
      <HeaderScreen />
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: "#fff",
          inactiveTintColor: "#253B6E",
          activeBackgroundColor: "#E43A19",
        }}
        appearance={{
          floating: true,
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Beranda",
            tabBarIcon: ({ color }) => (
              <Icon name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarLabel: "Keranjang",
            tabBarIcon: ({ color }) => (
              <IconIos name="cart-outline" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Transaksi"
          component={Transaksi}
          options={{
            tabBarIcon: ({ color }) => (
              <IconIos name="receipt-outline" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarLabel: "Akun",
            tabBarIcon: ({ color }) => (
              <IconIos
                name="md-person-circle-outline"
                color={color}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default MainScreen;
