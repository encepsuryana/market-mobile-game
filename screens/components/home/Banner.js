import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/Styles";
import { SliderBox } from "react-native-image-slider-box";

import { dataAPI } from "../../API";

const Banner = () => {
  //fetch Data Banner from api.belajarreactnative.com/top-up.json
  const [isLoading, setIsLoading] = useState(true);
  const [dataBanner, setDataBanner] = useState([]);

  useEffect(() => {
    const getData = () => {
      setIsLoading(true);
      try {
        dataAPI().then((responseJson) => {
          setDataBanner(responseJson.banners);
        });
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    getData();
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
      <View
        style={{
          marginTop: -20,
          marginHorizontal: 25,
        }}
      >
        <Text style={{ color: "#253B6E", marginBottom: 10 }}>
          Mau topup game apa nih? lagi ada promo sekarang loh
        </Text>
      </View>
    </View>
  );
};

export default Banner;
