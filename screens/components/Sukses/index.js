import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import styles from "../../../styles/Styles";

import { authentication, db } from "../../../firebase/Config";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

import { useNavigation } from "@react-navigation/native";
import HeaderScreen from "../header/HeaderScreen";
import Banner from "../home/Banner";
import Icons from "react-native-vector-icons/MaterialIcons";
import Footer from "../footer/Footer";
import NumberFormat from "react-number-format";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const TextLeftTransaksi = (props) => {
  return <Text style={styles.textTransaksi}>{props.text}</Text>;
};

const TextRightTransaksi = (props) => {
  return <Text style={styles.textDetailTransaksi}>{props.text}</Text>;
};

const PaymenteWallet = (props) => {
  const navigation = useNavigation();
  const nomerAkunRef = useRef();

  const [nomerAkun, setNomerAkun] = useState("");

  const submitPayment = async () => {
    if (nomerAkun === "") {
      Alert.alert("Peringatan", "Nomor akun harus diisi", [
        {
          text: "OK",
          onPress: () => {
            nomerAkunRef.current.focus();
          },
        },
      ]);
    } else {
      //update transaction payment status to true
      const transactionRef = collection(db, "transaction");

      const transactionRef2 = query(transactionRef, where("id", "==", invoice));

      getDocs(transactionRef2).then((doc) => {
        doc.forEach((doc) => {
          updateDoc(transactionRef, doc.id, {
            status: true,
            paymentDate: Timestamp.now(),
          });
        });
      });
    }
  };

  //validate is number empty

  return (
    <View>
      <Text style={styles.textInputPayment}>
        Silahkan isi Nomor {props.pay} yang sudah terdaftar
      </Text>
      <TextInput
        style={styles.input}
        placeholder="08212971xxxx"
        keyboardType="number-pad"
        onChangeText={(text) => setNomerAkun(text)}
        ref={nomerAkunRef}
        blurOnSubmit={true}
        returnKeyType="done"
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          //navigate to Home
          onPress={submitPayment}
          style={styles.buttonStyle}
        >
          <View style={styles.buttonIcons}>
            <Icons
              name="payment"
              style={{ marginRight: 12 }}
              size={24}
              color="#fff"
            />
            <Text style={styles.buttonText}>Bayar Sekarang</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const PaymentATMBersama = (props) => {
  return (
    <View>
      <Text>NO Rek {props.norek}</Text>
    </View>
  );
};

const PaymentMiniMarket = (props) => {
  return (
    <View>
      <Text>Mini Market {props.minimarket}</Text>
    </View>
  );
};

const Sukses = (props) => {
  const nama = props.route.params.dataTransaksi.name;
  const email = props.route.params.dataTransaksi.email;
  const item = props.route.params.dataTransaksi.item;
  const nickname = props.route.params.dataTransaksi.nickname;
  const id_game = props.route.params.dataTransaksi.id_game;
  const price = props.route.params.dataTransaksi.price;
  const payment = props.route.params.dataTransaksi.payment;
  const invoice = props.route.params.dataTransaksi.id;
  const status = props.route.params.dataTransaksi.status;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={60}>
        <View style={styles.container}>
          <HeaderScreen />
          <Banner />
          <View style={styles.wrapperSukses}>
            <View style={styles.wrapperJudulTransakasi}>
              <Text style={styles.judulTransaksi}>Topup Game Berhasil</Text>
              <Text style={styles.subJudulTransaksi}>
                Segera Selesaikan transaksi kamu sebelum item kamu kehabisan.
              </Text>
            </View>
            <View style={styles.wrapperTransaksi}>
              <View style={styles.wrapperTextGame}>
                <Text style={styles.titleGame}>
                  {props.route.params.dataTransaksi.game}
                </Text>
                <Text style={styles.invoice}>{invoice}</Text>
              </View>

              <View style={styles.bodyTransaksi}>
                <View style={styles.wrapperDetailTransaksi}>
                  <View style={styles.wrapperDetailTransaksiLeft}>
                    <TextLeftTransaksi text="Nama" />
                    <TextLeftTransaksi text="Email" />
                    <TextLeftTransaksi text="Item" />
                    <TextLeftTransaksi text="Nickname" />
                    <TextLeftTransaksi text="Id. Game" />
                    <TextLeftTransaksi text="Harga" />
                    <TextLeftTransaksi text="Pembayaran" />
                    <TextLeftTransaksi text="Status" />
                  </View>

                  <View style={styles.wrapperDetailTransaksiRight}>
                    <TextRightTransaksi text={nama} />
                    <TextRightTransaksi text={email} />
                    <TextRightTransaksi text={item} />
                    <TextRightTransaksi text={nickname} />
                    <TextRightTransaksi text={id_game} />
                    <TextRightTransaksi
                      text={
                        <NumberFormat
                          value={price}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"Rp. "}
                          renderText={(value) => <Text>{value}</Text>}
                        />
                      }
                    />

                    <TextRightTransaksi text={payment} />
                    <TextRightTransaksi
                      text={
                        status == false ? (
                          <View
                            style={{
                              backgroundColor: "red",
                              //border radius
                              borderRadius: 10,
                              paddingVetical: 2,
                              paddingHorizontal: 10,
                              height: 20,
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Text
                              style={{
                                color: "#fff",
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
                              alignItems: "center",
                            }}
                          >
                            <Text
                              style={{
                                color: "#fff",
                              }}
                            >
                              Selesai
                            </Text>
                          </View>
                        )
                      }
                    />
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.paymnetWrapper}>
              {/* render payment method */}
              {payment == "ATM Bersama" ? (
                <PaymentATMBersama norek="0890201821" />
              ) : payment == "OVO" ||
                payment == "Dana" ||
                payment == "Gopay" ? (
                <PaymenteWallet pay={payment} />
              ) : (
                <PaymentMiniMarket minimarket="Mini Market" />
              )}
            </View>
          </View>
        </View>
        <Footer />
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

export default Sukses;
