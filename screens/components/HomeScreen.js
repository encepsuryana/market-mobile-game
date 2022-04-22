import { ScrollView } from "react-native";
import React from "react";

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
      <Banner />
      <GameList />
      <Footer />
    </ScrollView>
  );
};

export default HomeScreen;
