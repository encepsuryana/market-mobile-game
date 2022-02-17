import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../../../styles/Styles";
import { useNavigation } from "@react-navigation/native";

//import db firestore
import db from "../../../firebase/Config";

const GameList = () => {
  //fetch game list from api.belajarreactnative.com/top-up.json
  const [isLoading, setIsLoading] = useState(true);
  const [dataGames, setDataGames] = useState([]);
  const [dataTopup, setDataTopup] = useState([]);
  const [selectCategorie, setSelectCategorie] = useState(1);
  const [dataCart, setDataCart] = useState([]);

  const navigation = useNavigation();

  const fetchData = async () => {
    const url = "https://api.belajarreactnative.com/top-up.json";
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        setDataGames(responseJson.listGames);
        setDataTopup(responseJson.listTopups);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  //get item.id, item.items, item.price, item.category, item.icon from dataGames
  const addToCart = (item) => {
    const itemCart = {
      id: item.id,
      items: item.items,
      price: item.price,
      category: item.category,
      icon: item.icon,
    };

    navigation.navigate("Cart", {
      itemCart: itemCart,
    });

    console.log(itemCart);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapperCategories}>
        <Text style={styles.titleCategories}>List Games</Text>
        <ScrollView horizontal={true}>
          {isLoading ? (
            <View style={styles.wrapperLoading}>
              <Text style={styles.textLoading}>Loading...</Text>
            </View>
          ) : (
            //Render List Games
            dataGames.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.Categories}
                  onPress={() => {
                    setSelectCategorie(index + 1);
                  }}
                >
                  <Image
                    style={{ width: 65, height: 65, borderRadius: 12 }}
                    source={{ uri: item.tile }}
                  />
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>

        {/* Render List Topup */}
        <View style={styles.wrapperTopupItems}>
          {isLoading ? (
            <View style={styles.wrapperLoading}>
              <Text style={styles.textLoading}>Loading...</Text>
            </View>
          ) : (
            //Render List Topup
            dataTopup.map((item, index) => {
              if (item.category === selectCategorie) {
                return (
                  <View key={index}>
                    <TouchableOpacity
                      style={styles.ItemStyle}
                      onPress={() => addToCart(item)}
                    >
                      {dataGames.map((list) => {
                        if (list.id === item.category) {
                          return (
                            <Image
                              style={styles.icoItem}
                              source={{ uri: list.icon }}
                            />
                          );
                        }
                      })}
                      <View style={styles.textTopup}>
                        <Text numberOfLines={1} style={styles.topupItem}>
                          {item.items}
                        </Text>

                        <Text numberOfLines={1} style={styles.topupPrice}>
                          Rp. {item.price}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }
            })
          )}
        </View>
      </View>
    </View>
  );
};

export default GameList;
