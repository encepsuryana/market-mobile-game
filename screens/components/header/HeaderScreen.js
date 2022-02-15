import { View, Text } from "react-native";
import React from "react";
import { authentication } from "../../../firebase/Config";
import styles from "../../../styles/Styles";

const HeaderScreen = () => {
  return (
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
  );
};

export default HeaderScreen;
