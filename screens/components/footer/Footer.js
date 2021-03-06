import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/Styles";

import { dataAPI } from "../../API";

const Footer = () => {
  //get data payment from api.belajarreactnative.com/payment.json
  const [isLoading, setIsLoading] = useState(true);
  const [dataPayment, setDataPayment] = useState([]);

  useEffect(() => {
    dataAPI().then((responseJson) => {
      setDataPayment(responseJson.listPayments);
      setIsLoading(false);
    });
  }, []);

  return (
    <View style={styles.containerFooter}>
      <View style={styles.paymentWrapper}>
        <View style={styles.wrapperFooter}>
          <Text style={styles.textDescription}>
            Kami menyediakan berbagai pilihan metode pembayaran yang kamu sukai
          </Text>
        </View>
        {/* render list topup as colomn */}
        {isLoading ? (
          <View style={styles.wrapperLoading}>
            <Text style={styles.textLoading}>Loading...</Text>
          </View>
        ) : (
          dataPayment.map((item, index) => {
            return (
              <View key={index}>
                <View style={styles.paymentImageWrapper}>
                  <Image
                    style={styles.imagePayment}
                    source={{ uri: item.icon }}
                  />
                </View>
              </View>
            );
          })
        )}
      </View>
    </View>
  );
};

export default Footer;
