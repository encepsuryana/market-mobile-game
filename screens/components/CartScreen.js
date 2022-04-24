import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import styles from "../../styles/Styles";

import { dataAPI } from "../API";

import EmptyCart from "./cart/Empty";
import { useNavigation } from "@react-navigation/native";
import Footer from "./footer/Footer";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Icon from "react-native-vector-icons/MaterialIcons";
import { authentication, db } from "../../firebase/Config";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import NumberFormat from "react-number-format";

const CartScreen = (props) => {
  const navigation = useNavigation();
  const nicknameRef = useRef();
  const idGameRef = useRef();

  const [idTransaksi, setIdTransaksi] = useState("");
  const [nickname, setNickname] = useState("");
  const [idGame, setIdgame] = useState("");
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [pembayaran, setPembayaran] = useState([]);
  const [metodePembayaran, setMetodePembayaran] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTransaksi, setIsTransaksi] = useState(false);
  const [isEmpety, setIsEmpety] = useState(false);

  const collectData = async () => {
    setIsLoading(true);
    try {
      const user = query(
        collection(db, "users"),
        where("email", "==", authentication.currentUser.email)
      );

      const getUser = await getDocs(user);

      getUser.forEach((doc) => {
        setNama(doc.data().name);
        setEmail(doc.data().email);
        setNoTelp(doc.data().phone);
      });

      dataAPI().then((responseJson) => {
        setPembayaran(responseJson.listPayments);
        setIsLoading(false);
      });

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }

    //function generate unique id
    function generateUUID() {
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate();

      var hour = d.getHours();
      var min = d.getMinutes();
      var sec = d.getSeconds();

      var uuid =
        "INV-" +
        month +
        day +
        year +
        hour +
        min +
        sec +
        "xxxxxxxxxxx".replace(/[xy]/g, function (c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        });
      return uuid;
    }

    setIdTransaksi(generateUUID());
  };

  const setTransaksi = async () => {
    //validate is nickname is empty
    if (nickname === "") {
      Alert.alert("Top up", "Nickname tidak boleh kosong", [
        {
          text: "OK",
          onPress: () => {
            nicknameRef.current.focus();
          },
        },
      ]);
      return;
    }

    //validate is idGame is empty
    if (idGame === "") {
      Alert.alert("Top up", "ID Game tidak boleh kosong", [
        {
          text: "OK",
          onPress: () => {
            idGameRef.current.focus();
          },
        },
      ]);
      return;
    }

    //validate is metodePembayaran is empty
    if (metodePembayaran === "") {
      Alert.alert(
        "Top up",
        "Silahkan pilih Metode Pembayaran terlebih dahulu",
        [
          {
            text: "OK",
          },
        ]
      );
      return;
    }

    setIsTransaksi(true);
    const dataTransaksi = {
      id: idTransaksi,
      name: nama,
      email: email,
      phone: noTelp,
      item: props.route.params.itemCart.items,
      price: props.route.params.itemCart.price,
      status: false,
      payment: metodePembayaran,
      createdAt: Timestamp.now(),
      nickname: nickname,
      id_game: idGame,
      game: props.route.params.itemCart.namaGame,
    };

    setTimeout(() => {
      //save to firebase and navigate to sukses

      const transaksi = addDoc(
        collection(db, "transaction"),
        {
          dataTransaksi,
        },
        (error) => {
          if (error) {
            console.log(error);
          }
        }
      );

      transaksi.then(() => {
        setIsTransaksi(false);
        navigation.navigate("Sukses", {
          dataTransaksi: dataTransaksi,
        });
      });
    }, 1800);
  };

  useEffect(() => {
    collectData();
    console.log(idTransaksi);
  }, []);

  //onPress change text from pembayaran
  const getPembayaran = (item) => {
    setMetodePembayaran(item.vendor);
  };

  const removeCart = () => {
    setIsEmpety(true);
    setTimeout(() => {
      navigation.navigate("Cart");
      setIsEmpety(false);
    }, 800);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={85}>
        <View style={styles.container}>
          {/* render if have data in props.route.params.itemCart*/}
          {props.route.params ? (
            <View style={styles.wrapperCart}>
              {isLoading ? (
                <View style={styles.wrapperLoading}>
                  <Text style={styles.textLoading}>Loading...</Text>
                </View>
              ) : (
                <View>
                  <Text style={styles.titleHome}>
                    {props.route.params.itemCart.namaGame}
                  </Text>
                  <Image
                    source={{
                      uri: props.route.params.itemCart.banner,
                    }}
                    style={styles.imageBanner}
                  />
                  <View style={styles.wrapperDescription}>
                    <Text style={styles.textDescription}>
                      {props.route.params.itemCart.deskripsi}
                    </Text>
                  </View>
                </View>
              )}

              <View style={styles.cartWrapper}>
                <Text style={styles.textCart}>
                  Kamu membeli,{" "}
                  <Text style={{ fontWeight: "bold", fontSize: 28 }}>
                    {props.route.params.itemCart.items}
                  </Text>
                </Text>
                <NumberFormat
                  value={props.route.params.itemCart.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Rp. "}
                  renderText={(value) => (
                    <Text style={styles.priceCart}>{value}</Text>
                  )}
                />
              </View>

              <View style={styles.wrapperForm}>
                <Text style={styles.textCart}>Lengkapi Data Game Kamu:</Text>
                <View style={styles.wrapperInput}>
                  <TextInput
                    placeholder="♪ɢᴇᴍɪғʏ"
                    value={nickname}
                    onChangeText={(text) => setNickname(text)}
                    style={styles.input}
                    ref={nicknameRef}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onSubmitEditing={() => {
                      idGameRef.current.focus();
                    }}
                  />
                  <TextInput
                    placeholder="46637477(2062)"
                    value={idGame}
                    onChangeText={(text) => setIdgame(text)}
                    style={styles.input}
                    ref={idGameRef}
                    returnKeyType="done"
                    blurOnSubmit={true}
                  />
                  <Text style={styles.textQA}>
                    Jangan sampai salah isi ya, segala transaksi yang sudah
                    masuk kedalam sistem tidak bisa di batalkan.
                  </Text>
                </View>
                <Text style={styles.textCart}>
                  Pilih Metode Pembayaran Kamu:{" "}
                </Text>
                <View style={styles.wrapperPayment}>
                  {/* render list topup as colomn */}
                  {isLoading ? (
                    <View style={styles.wrapperLoading}>
                      <Text style={styles.textLoading}>Loading...</Text>
                    </View>
                  ) : (
                    pembayaran.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={index}
                          onPress={() => getPembayaran(item)}
                        >
                          <View
                            style={
                              //change color if selected
                              metodePembayaran === item.vendor
                                ? styles.paymentImageWrapperCartSelected
                                : styles.paymentImageWrapperCart
                            }
                          >
                            <Image
                              style={styles.imagePayment}
                              source={{ uri: item.icon }}
                            />
                          </View>
                        </TouchableOpacity>
                      );
                    })
                  )}
                </View>
                <View style={styles.buttonCartContainer}>
                  {isTransaksi ? (
                    <TouchableOpacity
                      onPress={() => setTransaksi()}
                      style={styles.buttonStyle}
                    >
                      <View style={styles.buttonIcons}>
                        <ActivityIndicator
                          style={{ marginRight: 12 }}
                          size="small"
                          color="#fff"
                        />
                        <Text style={styles.buttonText}>
                          Pesanan sedang diproses
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => setTransaksi()}
                      style={styles.buttonStyle}
                    >
                      <View style={styles.buttonIcons}>
                        <Icon
                          name="shopping-cart"
                          style={{ marginRight: 12 }}
                          size={24}
                          color="#fff"
                        />
                        <Text style={styles.buttonText}>Pesan Sekarang</Text>
                      </View>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    onPress={() => removeCart()}
                    style={styles.buttonSecondaryStyle}
                  >
                    <View style={styles.buttonIcons}>
                      {isEmpety ? (
                        <ActivityIndicator
                          style={{ marginRight: 12 }}
                          size={24}
                          color="##E43A19"
                        />
                      ) : (
                        <Icon
                          name="delete-forever"
                          style={{ marginRight: 12 }}
                          size={24}
                          color="#E43A19"
                        />
                      )}
                      <Text style={styles.buttonSecondaryText}>
                        Kosongkan Keranjang
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <EmptyCart />
          )}
        </View>
        <Footer />
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

export default CartScreen;
