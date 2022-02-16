import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/Styles";
import { SliderBox } from "react-native-image-slider-box";

const Banner = () => {
  //fetch Data Banner from api.belajarreactnative.com/top-up.json
  const [isLoading, setIsLoading] = useState(true);
  const [dataBanner, setDataBanner] = useState([]);

  const fetchData = async () => {
    const url = "https://api.belajarreactnative.com/top-up.json";
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        setDataBanner(responseJson.banners);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.wrapperBanner}>
          {isLoading ? (
            <View style={styles.wrapperLoading}>
              <Text style={styles.textLoading}>Loading...</Text>
            </View>
          ) : (
            //Render Banner
            <View tyle={styles.container} onLayout={() => {}}>
              <SliderBox
                images={dataBanner}
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
          )}
        </View>
      </View>
    </View>
  );
};

export default Banner;
