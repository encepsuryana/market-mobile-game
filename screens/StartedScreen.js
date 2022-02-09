import {
  Image,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
} from "react-native";
import React, { useEffect } from "react";

import styles from "../styles/Styles";

import Start from "../assets/start.png";
import { useNavigation } from "@react-navigation/native";
import { authentication } from "../firebase/Config";

const StartedScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubcribe = authentication.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.email, " is signed in.");
        navigation.replace("Main");
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
          <Text style={{ color: "#253B6E" }}>
            Cepat - Terpercaya - Aman - Mudah
          </Text>
        </View>
        <View style={styles.imgContainer}>
          <Image style={styles.image} source={Start}></Image>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.buttonStyle}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Get's Started</Text>
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
