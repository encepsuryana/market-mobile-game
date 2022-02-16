import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/Styles";

const GameList = () => {
  //fetch game list from api.belajarreactnative.com/top-up.json
  const [isLoading, setIsLoading] = useState(true);
  const [dataGames, setDataGames] = useState([]);
  const [dataTopup, setDataTopup] = useState([]);
  const [selectCategorie, setSelectCategorie] = useState(1);

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
                      onPress={() => console.log(item.items)}
                    >
                      <Image
                        style={styles.icoItem}
                        resizeMode="stretch"
                        source={{ uri: item.icon }}
                      />
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
