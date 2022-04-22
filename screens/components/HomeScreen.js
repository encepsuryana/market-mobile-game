import { ScrollView } from "react-native";
import React from "react";

import HeaderScreen from "./header/HeaderScreen";
import Banner from "./home/Banner";
import GameList from "./home/GameList";
import Footer from "./footer/Footer";

const HomeScreen = () => {
  //disable back screen

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <HeaderScreen />
      <Banner />
      <GameList />
      <Footer />
    </ScrollView>
  );
};

export default HomeScreen;
