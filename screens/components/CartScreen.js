import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import styles from "../../styles/Styles";

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
import { async } from "@firebase/util";

const CartScreen = (props) => {
  const navigation = useNavigation();

  const nicknameRef = useRef();
  const idGameRef = useRef();

  const [nickname, setNickname] = useState("");
  const [idGame, setIdgame] = useState("");
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [pembayaran, setPembayaran] = useState([]);
  const [game, setGame] = useState("");
  const [banner, setBanner] = useState("");
  const [description, setDescription] = useState("");
  const [metodePembayaran, setMetodePembayaran] = useState("");
  const [idTransaksi, setIdTransaksi] = useState("");

  //get banner from api.belajarreactnative.com/top-up.json
  const [isLoading, setIsLoading] = useState(false);
  const [isTransaksi, setIsTransaksi] = useState(false);
  const [dataGames, setDataGames] = useState([]);

  const DataUser = async () => {
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
  };

  //generate id transaksi number 1 to n
  const generateIdTransaksi = async () => {
    const transaksi = query(
      collection(db, "transaction"),
      where("idTransaksi", "==", "")
    );

    const getTransaksi = await getDocs(transaksi);

    getTransaksi.forEach((doc) => {
      setIdTransaksi(doc.data().idTransaksi);
    });

    if (idTransaksi === "") {
      setIdTransaksi(0);
    } else {
      setIdTransaksi(parseInt(idTransaksi) + 1);
    }

    return idTransaksi;
  };

  const setTransaksi = async () => {
    //validate nickname
    if (nickname === "") {
      Alert.alert("Top Up", "Nickname harus diisi", [
        {
          text: "OK",
          onPress: () => {
            //focus on email input
            nicknameRef.current.focus();
          },
        },
      ]);
      return;
    }
    if (idGame === "") {
      Alert.alert("Top Up", "ID Game harus diisi", [
        {
          text: "OK",
          onPress: () => {
            //focus on email input
            idGameRef.current.focus();
          },
        },
      ]);
      return;
    }

    //validate matode pembayaran
    if (metodePembayaran === "") {
      Alert.alert(
        "Top Up",
        "Silahkan pilih terlebih dahulu Metode Pembayaran",
        [
          {
            text: "OK",
          },
        ]
      );
      return;
    }

    const dataTransaksi = {
      idTransaksi: idTransaksi,
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
      game: game,
    };

    setIsTransaksi(true);

    setTimeout(() => {
      const transaksi = addDoc(
        collection(db, "transaction"),
        {
          dataTransaksi,
        },
        (error) => {
          console.log(error);
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

  const fetchData = async () => {
    const url = "https://api.belajarreactnative.com/top-up.json";
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        setDataGames(responseJson.listGames);
        setPembayaran(responseJson.listPayments);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const data_game = () => {
    dataGames.map((item) => {
      if (item.id === props.route.params.itemCart.category) {
        setGame(item.name);
        setBanner(item.banner);
        setDescription(item.description);
      }
    });
  };

  useEffect(() => {
    fetchData();
    DataUser();
    data_game();
    generateIdTransaksi();
  }, [
    props.route.params.itemCart.items,
    props.route.params.itemCart.price,
    props.route.params.itemCart.category,
  ]);

  //onPress change text from pembayaran
  const getPembayaran = (item) => {
    setMetodePembayaran(item.vendor);
  };

  const removeCart = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigation.navigate("Cart");
      setIsLoading(false);
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
                  <Text style={styles.titleHome}>{game}</Text>
                  <Image
                    source={{
                      uri: banner,
                    }}
                    style={styles.imageBanner}
                  />
                  <View style={styles.wrapperDescription}>
                    <Text style={styles.textDescription}>{description}</Text>
                  </View>
                </View>
              )}

              <View style={styles.cartWrapper}>
                <Text style={styles.textCart}>
                  Kamu membeli,{" "}
                  <Text style={{ fontWeight: "bold", fontSize: 26 }}>
                    {props.route.params.itemCart.items}
                  </Text>
                </Text>
                <Text style={styles.priceCart}>
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(props.route.params.itemCart.price)}
                </Text>
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
                    onSubmitEditing={() => {
                      idGameRef.current.focus();
                    }}
                    blurOnSubmit={false}
                  />
                  <TextInput
                    placeholder="46637477(2062)"
                    value={idGame}
                    onChangeText={(text) => setIdgame(text)}
                    style={styles.input}
                    ref={idGameRef}
                    returnKeyType="done"
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
                          size={24}
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
                    onPress={removeCart}
                    style={styles.buttonSecondaryStyle}
                  >
                    <View style={styles.buttonIcons}>
                      {isLoading ? (
                        <ActivityIndicator
                          style={{ marginRight: 12 }}
                          size="small"
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
