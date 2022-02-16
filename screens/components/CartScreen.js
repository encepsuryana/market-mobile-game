import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "../../styles/Styles";

const CartScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataCart, setDataCart] = useState([]);
  const [total, setTotal] = useState(0);

  //fecth data from asyncstorage
  const fetchData = async () => {
    const dataCart = await AsyncStorage.getItem("cart");
    if (dataCart !== null) {
      const cart = JSON.parse(dataCart);
      setDataCart(cart);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.wrapperLoading}>
            <Text style={styles.textLoading}>Loading...</Text>
          </View>
        ) : (
          <View style={styles.wrapper}>
            <Text style={styles.title}>Cart</Text>
            {dataCart.map((item, index) => {
              return (
                <View key={index} style={styles.wrapperItem}>
                  <View style={styles.wrapperImage}>
                    <Image
                      style={styles.icoItem}
                      resizeMode="stretch"
                      source={{ uri: item.icon }}
                    />
                  </View>
                  <View style={styles.wrapperText}>
                    <Text style={styles.text}>{item.items}</Text>
                    <Text style={styles.text}>{item.price}</Text>
                  </View>
                  <View style={styles.wrapperButton}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        const cart = dataCart.filter((item) => {
                          return item.id !== item.id;
                        });
                        setDataCart(cart);
                        AsyncStorage.setItem("cart", JSON.stringify(cart));
                      }}
                    >
                      <Text style={styles.textButton}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default CartScreen;
