import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/Styles";

const Footer = () => {
  //get data payment from api.belajarreactnative.com/payment.json
  const [isLoading, setIsLoading] = useState(true);
  const [dataPayment, setDataPayment] = useState([]);

  const fetchData = async () => {
    const url = "https://api.belajarreactnative.com/top-up.json";
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        setDataPayment(responseJson.listPayments);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
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
