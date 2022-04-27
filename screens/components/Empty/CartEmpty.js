import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import styles from "../../../styles/Styles";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const CartEmpty = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.wrapperCart}>
        <View style={styles.cartWrapper}>
          <Text style={styles.textCart}>
            Yah, keranjang kamu masih kosong :(
          </Text>

          <Icon
            name="bacteria-outline"
            size={100}
            color="#E43A19"
            style={{ marginVertical: 12 }}
          />
          <Text style={styles.descCart}>
            Jangan biarkan item yang kamu inginkan kehabisan ya..
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#253B63",
            }}
          >
            Amankan Item game Favorit kamu sekarang
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            //navigate to Home
            onPress={() => navigation.navigate("Home")}
            style={styles.buttonStyle}
          >
            <View style={styles.buttonIcons}>
              <Icon
                name="cart"
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
  );
};

export default CartEmpty;
