import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
} from "react-native";

import { SliderBox } from "react-native-image-slider-box";
import Icon from "react-native-vector-icons/Ionicons";

var { height, width } = Dimensions.get("window");

import DetailBanner from "../Banner/DetailBanner";

import styles from "../../styles/Styles";

import { authentication } from "../../firebase/Config";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataBanner: [],
      dataGames: [],
      dataTopups: [],
      dataPayments: [],
      selectCatg: "All",
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
          dataGames: responseJson.listGames,
          dataTopups: responseJson.listTopups,
          dataPayments: responseJson.listPayments,
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
        <View style={styles.container}>
          <View style={styles.textContainerHome}>
            <Text style={styles.titleHome}>
              Hi, {authentication.currentUser.email}
            </Text>
            <Text style={{ color: "#253B6E", marginTop: 12 }}>
              Mau topup game apa nih? lagi ada promo sekarang loh
            </Text>
          </View>
        </View>

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

        <View style={(styles.container, { marginTop: -21 })}>
          <View style={styles.wrapperCategories}>
            <View
              style={{
                borderRadius: 20,
                paddingVertical: 20,
                paddingHorizontal: 20,
              }}
            >
              <Text style={styles.titleCategories}>List Games</Text>
              <View style={{ height: 10 }} />
              <FlatList
                horizontal={true}
                data={this.state.dataGames}
                renderItem={({ item }) => this._renderCategories(item)}
                keyExtractor={(item, index) => index.toString()}
              />

              <FlatList
                data={this.state.dataTopups}
                numColumns={2}
                renderItem={({ item }) => this._renderItemTopups(item)}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  _renderCategories(item) {
    return (
      <TouchableOpacity
        style={[styles.Categories]}
        onPress={() => this.setState({ selectCatg: item.id })}
      >
        <Image
          style={{ width: 65, height: 65, borderRadius: 12 }}
          source={{ uri: item.tile }}
        />
      </TouchableOpacity>
    );
  }

  _renderItemTopups(item) {
    let catg = this.state.selectCatg;
    if (catg == "All" || catg == item.category) {
      return (
        <TouchableOpacity style={styles.divFood}>
          <Image style={styles.imageFood} source={{ uri: item.icon }} />
          <View
            style={{
              backgroundColor: "transparent",
              width: width / 2 - 20 - 10,
            }}
          />
          <Text
            style={{ fontWeight: "bold", fontSize: 14, textAlign: "center" }}
          >
            {item.items}
          </Text>
          <Text style={{ fontSize: 16, color: "green" }}>Rp. {item.price}</Text>
        </TouchableOpacity>
      );
    }
  }
}
