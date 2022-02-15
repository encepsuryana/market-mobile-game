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

var { height, width } = Dimensions.get("window");

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

        <View style={(styles.container, { marginTop: -20 })}>
          <View style={styles.wrapperCategories}>
            <View
              style={{
                paddingHorizontal: 12,
              }}
            >
              {/* Render List Games */}
              <View>
                <Text style={styles.titleCategories}>List Games</Text>
                <View style={{ height: 10 }} />
                <ScrollView horizontal={true}>
                  {this.state.dataGames.map((item, index) => {
                    return (
                      <TouchableOpacity
                        style={styles.Categories}
                        key={index}
                        onPress={() => this.setState({ selectCatg: item.id })}
                      >
                        <Image
                          style={{ width: 65, height: 65, borderRadius: 12 }}
                          source={{ uri: item.tile }}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>

              {/* Render Items */}
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {this.state.dataTopups.map((item, index) => {
                  let catg = this.state.selectCatg;
                  if (catg == "All" || catg == item.category) {
                    return (
                      <View>
                        <TouchableOpacity style={styles.ItemStyle} key={index}>
                          <Image
                            style={styles.icoItem}
                            resizeMode="stretch"
                            source={{ uri: item.icon }}
                          />
                          <View style={{ marginLeft: 12 }}>
                            <Text
                              numberOfLines={1}
                              style={{
                                fontSize: 14,
                                width: 90,
                              }}
                            >
                              {item.items}
                            </Text>

                            <Text
                              numberOfLines={1}
                              style={{
                                fontWeight: "bold",
                                fontSize: 16,
                                color: "green",
                                width: 90,
                              }}
                            >
                              Rp. {item.price}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  }
                })}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
