import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/Styles";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../../firebase/Config";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

import NumberFormat from "react-number-format";

import { dataAPI } from "../../API";

const GameList = () => {
  //fetch game list from api.belajarreactnative.com/top-up.json
  const [isLoading, setIsLoading] = useState(false);
  const [dataGames, setDataGames] = useState([]);
  const [dataTopup, setDataTopup] = useState([]);
  const [selectCategorie, setSelectCategorie] = useState(1);

  const [namaGame, setNamaGame] = useState("");
  const [banner, setBanner] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [iconGame, setIconGame] = useState("");

  const navigation = useNavigation();

  const getData = async () => {
    setIsLoading(true);
    try {
      dataAPI().then((responseJson) => {
        setDataGames(responseJson.listGames),
          setDataTopup(responseJson.listTopups);
      });

      const gameRef = collection(db, "games");
      getDocs(gameRef).then((doc) => {
        //check is collection "games" is not exist
        if (doc.empty) {
          dataGames.forEach((game) => {
            addDoc(gameRef, game);
          });
        }
      });

      //get data from collection "games" by selectCategorie and set to local state
      const gameRef2 = collection(db, "games");
      const gameRef3 = query(gameRef2, where("id", "==", selectCategorie));
      getDocs(gameRef3).then((doc) => {
        doc.forEach((doc) => {
          setNamaGame(doc.data().name);
          setBanner(doc.data().banner);
          setDeskripsi(doc.data().description);
          setIconGame(doc.data().icon);
        });
      });

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (item) => {
    const itemCart = {
      id: item.id,
      items: item.items,
      price: item.price,
      category: item.category,
      namaGame: namaGame,
      banner: banner,
      deskripsi: deskripsi,
      iconGame: iconGame,
    };

    navigation.navigate("Cart", {
      itemCart: itemCart,
    });

    console.log(itemCart);
  };

  useEffect(() => {
    getData();

    setSelectCategorie(selectCategorie);
  }, [selectCategorie, namaGame, banner, deskripsi, iconGame]);
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
                          <NumberFormat
                            value={item.price}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Rp. "}
                            decimalSeparator={"."}
                            renderText={(value) => <Text>{value}</Text>}
                          />
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
