import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import styles from "../../../styles/Styles";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const Empty = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.wrapperCart}>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 40,
          }}
        >
          <Icon name="cart" size={24} color="#253B63" />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#253B63",
              marginLeft: 10,
            }}
          >
            Yah, keranjang kamu masih kosong :(
          </Text>
        </View>
        <View style={styles.cartWrapper}>
          <Icon
            name="bacteria-outline"
            size={100}
            color="#E43A19"
            style={{ marginBottom: 12 }}
          />
          <Text style={styles.textCart}>Amankan Item game Favorit kamu </Text>
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

export default Empty;
