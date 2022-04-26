import { Text, TouchableOpacity, View, ScrollView, Image } from "react-native";
import React, { useState, useEffect } from "react";
import styles from "../../../styles/Styles";

import { useNavigation } from "@react-navigation/native";
import Icons from "react-native-vector-icons/MaterialIcons";

import { authentication, db } from "../../../firebase/Config";
import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import NumberFormat from "react-number-format";
import Footer from "../footer/Footer";

const Transaksi = () => {
  //fetch data from firebase
  const [isLoading, setIsLoading] = useState(false);
  const [dataTransaksi, setDataTransaksi] = useState([]);
  //get data transaction by authentication.currentUser.email
  const getDataTransaction = async () => {
    const data = query(
      collection(db, "transaction"),
      where("email", "==", authentication.currentUser.email)
    );

    const collect = await getDocs(data);

    //get all data from collection "transaction" by authentication.currentUser.email and convert to array
    const dataTransaksi = collect.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    setDataTransaksi(dataTransaksi);

    console.log("id ", dataTransaksi);
  };

  //get realtime data from collection "transaction"
  useEffect(() => {
    getDataTransaction();

    const data = onSnapshot(collection(db, "transaction"), (snapshot) => {
      const dataTransaksi = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setDataTransaksi(dataTransaksi);
    });

    return () => {
      data();
    };
  }, [authentication.currentUser.email]);

  const navigation = useNavigation();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.wrapperCart}>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Icons name="history" size={24} color="#253B63" />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "#253B63",
                marginLeft: 10,
              }}
            >
              Transaksi Terakhir Kamu
            </Text>
          </View>

          <View style={styles.line} />
          {/*Render data transaction*/}
          {dataTransaksi.map((transaction) => {
            return (
              <View key={transaction.id} style={styles.transactionWrapper}>
                <View style={styles.transactionBody} key={transaction.id}>
                  <Image
                    source={{ uri: transaction.tile }}
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: 8,
                    }}
                  />

                  <View
                    style={{
                      marginLeft: 20,
                    }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "#253B6E",
                      }}
                    >
                      {transaction.game}
                    </Text>

                    {transaction.status === false ? (
                      <View
                        style={{
                          backgroundColor: "red",
                          //border radius
                          borderRadius: 10,
                          paddingVetical: 2,
                          paddingHorizontal: 10,
                          height: 20,
                          width: 143,
                          justifyContent: "center",
                          marginTop: 2,
                        }}
                      >
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: 12,
                          }}
                        >
                          Menunggu Pembayaran
                        </Text>
                      </View>
                    ) : (
                      <View
                        style={{
                          backgroundColor: "green",
                          //border radius
                          borderRadius: 10,
                          paddingVetical: 2,
                          paddingHorizontal: 10,
                          height: 20,
                          justifyContent: "center",
                          marginTop: 2,
                          width: 60,
                        }}
                      >
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: 12,
                          }}
                        >
                          Selesai
                        </Text>
                      </View>
                    )}

                    <View
                      style={{
                        marginTop: 8,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          color: "#253B6E",
                        }}
                      >
                        {transaction.item}
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          color: "#253B6E",
                          fontWeight: "bold",
                        }}
                      >
                        <NumberFormat
                          value={transaction.price}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"Rp. "}
                          decimalSeparator={"."}
                          renderText={(value) => <Text>{value}</Text>}
                        />
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              //navigate to Home
              onPress={() => navigation.navigate("Home")}
              style={styles.buttonStyle}
            >
              <View style={styles.buttonIcons}>
                <Icons
                  name="shopping-cart"
                  style={{ marginRight: 12 }}
                  size={24}
                  color="#fff"
                />
                <Text style={styles.buttonText}>Kembali Belanja</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Footer />
      </View>
    </ScrollView>
  );
};

export default Transaksi;
