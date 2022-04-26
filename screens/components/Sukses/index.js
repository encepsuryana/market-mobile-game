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
  Timestamp,
  updateDoc,
  doc,
  onSnapshot,
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
      //update data transaction status to true
      const updateTransaksi = doc(
        db,
        "transaction", //collection
        //get id from document
        props.docId
      );

      await updateDoc(updateTransaksi, {
        status: true,
        paymentDate: Timestamp.now(),
        paymentNumber: nomerAkun,
      });
    }
  };

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
  const [isLoading, setIsLoading] = useState(false);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [item, setItem] = useState("");
  const [nickname, setNickname] = useState("");
  const [idGame, setIdGame] = useState("");
  const [price, setPrice] = useState("");
  const [payment, setPayment] = useState("");
  const [invoice, setInvoice] = useState("");
  const [docId, setDocId] = useState("");
  const [status, setStatus] = useState(false);
  const [namaGame, setNamaGame] = useState("");

  const getDatabyIDTransaction = async () => {
    setIsLoading(true);
    const transactionID = props.route.params.dataTransaksi.invoice;

    try {
      const fetchDataTransactionbyID = query(
        collection(db, "transaction"),
        where("invoice", "==", transactionID)
      );

      const getDataTransactionbyID = await getDocs(fetchDataTransactionbyID);
      getDataTransactionbyID.forEach((doc) => {
        setNama(doc.data().name);
        setEmail(doc.data().email);
        setItem(doc.data().item);
        setNickname(doc.data().nickname);
        setIdGame(doc.data().id_game);
        setPrice(doc.data().price);
        setPayment(doc.data().payment);
        setInvoice(doc.data().invoice);
        setStatus(doc.data().status);
        setNamaGame(doc.data().game);
        setDocId(doc.id);
      });

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDatabyIDTransaction();
  }, []);

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
                <Text style={styles.titleGame}>{namaGame}</Text>
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
                    <TextRightTransaksi text={idGame} />
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
                <PaymenteWallet pay={payment} id={invoice} docId={docId} />
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
