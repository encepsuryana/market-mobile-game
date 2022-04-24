import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import React from "react";
import styles from "../../../styles/Styles";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
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
          <View style={styles.cartWrapper}>
            <Icon
              name="cart-remove"
              size={100}
              color="#E43A19"
              style={{ marginBottom: 12 }}
            />
            <Text style={styles.textCart}>Cart kamu kosong nih :( </Text>
            <Text style={styles.descCart}>
              Jangan biarkan item yang kamu inginkan kehabisan ya..
            </Text>
          </View>

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
