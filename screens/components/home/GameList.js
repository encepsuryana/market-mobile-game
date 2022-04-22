import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/Styles";
import { useNavigation } from "@react-navigation/native";

import { dataAPI } from "../../API";

//import db firestore
import db from "../../../firebase/Config";
import { Platform } from "react-native-web";

const GameList = () => {
  //fetch game list from api.belajarreactnative.com/top-up.json
  const [isLoading, setIsLoading] = useState(false);
  const [dataGames, setDataGames] = useState([]);
  const [dataTopup, setDataTopup] = useState([]);
  const [selectCategorie, setSelectCategorie] = useState(1);

  const [namaGame, setNamaGame] = useState("");
  const [banner, setBanner] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const getData = () => {
      setIsLoading(true);
      try {
        dataAPI().then((responseJson) => {
          setDataGames(responseJson.listGames),
            setDataTopup(responseJson.listTopups);
        });
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    getData();
  }, []);

  const addToCart = (item) => {
    const itemCart = {
      id: item.id,
      items: item.items,
      price: item.price,
      category: item.category,
      namaGame: namaGame,
      banner: banner,
      deskripsi: deskripsi,
    };

    dataGames.map(async (data) => {
      // if data.id === item.category set to state
      if (data.id === item.category) {
        setNamaGame(data.nama);
        setBanner(data.banner);
        setDeskripsi(data.description);
      }
    });

    navigation.navigate("Cart", {
      itemCart: itemCart,
    });

    console.log(itemCart);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapperCategories}>
        <Text style={styles.titleCategories}>List Games</Text>
        <ScrollView
          horizontal={true}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
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
      </View>

      {/* Render List Topup */}
      <View style={styles.itemTopup}>
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
                      {dataGames.map((list, index) => {
                        if (list.id === item.category) {
                          return (
                            <Image
                              key={index}
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
                          {/* number format */}
                          {/* if android */}
                          <Text>Rp. {item.price}</Text>
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
