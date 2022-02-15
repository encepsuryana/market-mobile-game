import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";

import { SliderBox } from "react-native-image-slider-box";
import styles from "../../styles/Styles";
import HeaderScreen from "./header/HeaderScreen";
import GameList from "./home/GameList";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataBanner: [],
    };
  }

  componentDidMount() {
    const url = "https://api.belajarreactnative.com/top-up.json";
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataBanner: responseJson.banners,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <HeaderScreen />

        <View style={styles.container}>
          <View style={styles.wrapper}>
            <View style={styles.wrapperBanner}>
              <View tyle={styles.container} onLayout={this.onLayout}>
                <SliderBox
                  images={this.state.dataBanner}
                  dotColor="#E43A19"
                  inactiveDotColor="#fff"
                  autoplay
                  circleLoop
                  sliderBoxHeight={140}
                  ImageComponentStyle={{
                    borderRadius: 20,
                    width: "90%",
                  }}
                  imageLoadingColor="#E43A19"
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.wrapperCategories}>
            <View
              style={{
                paddingHorizontal: 12,
              }}
            >
              {/* Render List Games & Topup Item */}
              <GameList />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
