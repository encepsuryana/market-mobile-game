import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import styles from "../../../styles/Styles";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

const Empty = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Oops...</Text>

        <View style={styles.cartWrapper}>
          <Icon
            name="cart-remove"
            size={100}
            color="#E43A19"
            style={{ marginBottom: 12 }}
          />
          <Text style={styles.textCart}>Cart kamu kosong nih :( </Text>
          <Text style={styles.textQA}>
            Jangan biarkan item yang kamu inginkan kehabisan ya..{" "}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            //navigate to Home
            onPress={() => navigation.navigate("Home")}
            style={styles.buttonStyle}
          >
            <Text style={styles.buttonText}>Belanja Sekarang!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Empty;
