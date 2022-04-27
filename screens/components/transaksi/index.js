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
  orderBy,
} from "firebase/firestore";
import NumberFormat from "react-number-format";
import Footer from "../footer/Footer";
import TransaksiEmpty from "../Empty/TransaksiEmpty";

const Transaksi = () => {
  //fetch data from firebase
  const [isLoading, setIsLoading] = useState(false);
  const [checkData, setCheckData] = useState(false);
  const [dataTransaksi, setDataTransaksi] = useState([]);
  //get data transaction by authentication.currentUser.email

  const getDataTransaction = async () => {
    setIsLoading(true);
    try {
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
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //get realtime data from collection "transaction"
  useEffect(() => {
    getDataTransaction();
    //validate is dataTransaksi is empty or not
    if (dataTransaksi.length === 0) {
      setCheckData(true);
    } else {
      const data = onSnapshot(collection(db, "transaction"), (snapshot) => {
        const dataTransaksi = snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        setDataTransaksi(dataTransaksi);

        setCheckData(false);
      });

      return () => {
        data();
      };
    }
  }, [authentication.currentUser.email, dataTransaksi.length]);

  const navigation = useNavigation();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      {checkData ? (
        <View>
          <TransaksiEmpty />
          <Footer />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.wrapperCart}>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Icons name="history" size={24} color="#253B63" />
              <Text style={styles.titleTransaksi}>Transaksi Terakhir Kamu</Text>
            </View>

            <View style={styles.line} />
            {/*Render data transaction*/}
            {dataTransaksi.map((transaction) => {
              return (
                <View key={transaction.id} style={styles.transactionWrapper}>
                  <View style={styles.transactionBody} key={transaction.id}>
                    <Image
                      source={{ uri: transaction.tile }}
                      style={styles.imgTransaksi}
                    />

                    <View style={styles.wrapperTransaksiRight}>
                      <Text style={styles.invoice}>{transaction.invoice}</Text>

                      {transaction.status === false ? (
                        <View style={styles.trasaksiInvalid}>
                          <Text style={styles.textTransaksi}>
                            Menunggu Pembayaran
                          </Text>
                        </View>
                      ) : (
                        <View style={styles.transaksiValid}>
                          <Text style={styles.textTransaksi}>Selesai</Text>
                        </View>
                      )}

                      <View style={styles.wrapperDetailTransaksi}>
                        <Text
                          numberOfLines={1}
                          style={styles.namaGameTransaksi}
                        >
                          {transaction.item} - {transaction.game}
                        </Text>
                        <Text style={styles.textPriceTransaksi}>
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
      )}
    </ScrollView>
  );
};

export default Transaksi;
