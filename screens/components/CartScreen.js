import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Styles";

import EmptyCart from "./cart/Empty";
import { useNavigation } from "@react-navigation/native";
import Footer from "./footer/Footer";

const CartScreen = (props) => {
  const navigation = useNavigation();

  const [nickname, setNickname] = useState("");
  const [idGame, setIdgame] = useState("");

  //get banner from api.belajarreactnative.com/top-up.json
  const [isLoading, setIsLoading] = useState(true);
  const [dataGames, setDataGames] = useState([]);

  //add data to firebase

  const fetchData = async () => {
    const url = "https://api.belajarreactnative.com/top-up.json";
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        setDataGames(responseJson.listGames);
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
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.container}>
        {/* render if have data in props.route.params.itemCart*/}
        {props.route.params ? (
          <View style={styles.wrapperCart}>
            {isLoading ? (
              <View style={styles.wrapperLoading}>
                <Text style={styles.textLoading}>Loading...</Text>
              </View>
            ) : (
              dataGames.map((item, index) => {
                if (item.id === props.route.params.itemCart.category) {
                  return (
                    <View key={index}>
                      <Text style={styles.titleHome}>{item.name}</Text>
                      <Image
                        source={{
                          uri: item.banner,
                        }}
                        style={styles.imageBanner}
                      />
                      <View style={styles.wrapperDescription}>
                        <Text style={styles.textDescription}>
                          {item.description}
                        </Text>
                      </View>
                    </View>
                  );
                }
              })
            )}

            <View style={styles.cartWrapper}>
              <Text style={styles.textCart}>
                Kamu membeli,{" "}
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                  {props.route.params.itemCart.items}
                </Text>
              </Text>
              <Text style={styles.priceCart}>
                Rp. {props.route.params.itemCart.price}
              </Text>
            </View>

            <View style={styles.wrapperForm}>
              <Text style={styles.textCart}>Lengkapi data game Kamu</Text>

              <View style={styles.wrapperInput}>
                <TextInput
                  placeholder="Nickname Kamu"
                  value={nickname}
                  onChangeText={(text) => setNickname(text)}
                  style={styles.input}
                />
                <TextInput
                  placeholder="ID Game Kamu (ID Server)"
                  value={idGame}
                  onChangeText={(text) => setIdgame(text)}
                  style={styles.input}
                />
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  //navigate to Home
                  onPress={() => navigation.navigate("Home")}
                  style={styles.buttonStyle}
                >
                  <Text style={styles.buttonText}>Pesan Sekarang</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.textQA}>
                Jangan sampai salah isi ya, segala transaksi yang sudah masuk
                kedalam sistem tidak bisa di batalkan.
              </Text>
            </View>
          </View>
        ) : (
          <EmptyCart />
        )}
      </View>
      <Footer />
    </ScrollView>
  );
};

export default CartScreen;
