import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import React from "react";
import styles from "../../../styles/Styles";

import { useNavigation } from "@react-navigation/native";
import Icons from "react-native-vector-icons/MaterialIcons";

const Transaksi = () => {
  const navigation = useNavigation();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.cartWrapper}></View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              //navigate to Home
              onPress={() => navigation.navigate("Home")}
              style={styles.buttonStyle}
            >
              <View style={styles.buttonIcons}>
                <Icons
                  name="shopping-cart"
                  style={{ marginRight: 12 }}
                  size={24}
                  color="#fff"
                />
                <Text style={styles.buttonText}>Belanja Sekarang</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Transaksi;
