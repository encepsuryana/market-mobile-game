import {
  Image,
  Text,
  View,
  ActivityIndicator,
  TouchableHighlight,
} from "react-native";
import React, { useEffect, useState } from "react";

import styles from "../styles/Styles";

import Start from "../assets/start.png";
import { useNavigation } from "@react-navigation/native";
import { authentication } from "../firebase/Config";

import Icon from "react-native-vector-icons/AntDesign";

const StartedScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  //onclick delay 2 second activity indicator
  const toLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigation.replace("Login");
      setIsLoading(false);
    }, 1800);
  };

  useEffect(() => {
    const unsubcribe = authentication.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.email, " is signed in.");
        navigation.replace("Main");
      } else {
        console.log("user is not signed in");
        // getData();
      }
    });
    return unsubcribe;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Top Up</Text>
          <Text style={styles.title}>Mobile Games</Text>
          <Text style={styles.subTitleSplash}>
            Cepat - Terpercaya - Aman - Mudah
          </Text>
        </View>
        <View style={styles.imgContainer}>
          <Image style={styles.image} source={Start}></Image>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight style={styles.startedSttyle} onPress={toLogin}>
            {/* onclick loading open activity indicator */}
            {isLoading ? (
              <View style={styles.buttonIcons}>
                <Text style={styles.buttonText}>Get's Started</Text>
                <ActivityIndicator
                  style={{ marginLeft: 12 }}
                  size="small"
                  color="#fff"
                />
              </View>
            ) : (
              <View style={styles.buttonIcons}>
                <Text style={styles.buttonText}>Get's Started</Text>
                <Icon
                  name="rightcircleo"
                  size={20}
                  color="#fff"
                  style={{ marginLeft: 12 }}
                />
              </View>
            )}
          </TouchableHighlight>

          <Text style={styles.textQA}>
            *Syarat & Ketentuan berlaku, segala bentuk tindakan hukum akan kami
            proses kepihak yang berwajib
          </Text>
        </View>
      </View>
    </View>
  );
};

export default StartedScreen;
