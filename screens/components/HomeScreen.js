import { ScrollView } from "react-native";
import React from "react";

import HeaderScreen from "./header/HeaderScreen";
import Banner from "./home/Banner";
import GameList from "./home/GameList";

const HomeScreen = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <HeaderScreen />
      <Banner />
      <GameList />
    </ScrollView>
  );
};

export default HomeScreen;
