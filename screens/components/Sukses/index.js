import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import React from "react";
import styles from "../../../styles/Styles";

import { authentication, db } from "../../../firebase/Config";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp,
} from "firebase/firestore";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import HeaderScreen from "../header/HeaderScreen";
import Banner from "../home/Banner";
import Icons from "react-native-vector-icons/MaterialIcons";
import Footer from "../footer/Footer";
import NumberFormat from "react-number-format";

const Sukses = (props) => {
  const navigation = useNavigation();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.container}>
        <HeaderScreen />
        <Banner />
        <View style={styles.wrapper}>
          <View style={styles.wrapperJudulTransakasi}>
            <Text style={styles.judulTransaksi}>Topup Game Berhasil</Text>
            <Text style={styles.subJudulTransaksi}>
              Segera Selesaikan transaksi kamu sebelum item kamu kehabisan.
            </Text>
          </View>
          <View style={styles.wrapperTransaksi}>
            <Text style={styles.titleGame}>
              {props.route.params.dataTransaksi.game}
            </Text>

            <View style={styles.bodyTransaksi}>
              <View style={styles.wrapperDetailTransaksi}>
                <View style={styles.wrapperDetailTransaksiLeft}>
                  <Text style={styles.textDetailTransaksi1}>Nama</Text>
                  <Text style={styles.textDetailTransaksi1}>Email</Text>
                  <Text style={styles.textDetailTransaksi1}>No. Telp</Text>
                  <Text style={styles.textDetailTransaksi1}>Item</Text>
                  <Text style={styles.textDetailTransaksi1}>Nickname</Text>
                  <Text style={styles.textDetailTransaksi1}>ID. Game</Text>
                  <Text style={styles.textDetailTransaksi1}>Harga</Text>
                  <Text style={styles.textDetailTransaksi1}>Pembayaran</Text>
                  <Text style={styles.textDetailTransaksi1}>Status</Text>
                </View>

                <View style={styles.wrapperDetailTransaksiRight}>
                  <Text numberOfLines={1} style={styles.textDetailTransaksi}>
                    : {props.route.params.dataTransaksi.name}
                  </Text>
                  <Text numberOfLines={1} style={styles.textDetailTransaksi}>
                    : {props.route.params.dataTransaksi.email}
                  </Text>
                  <Text numberOfLines={1} style={styles.textDetailTransaksi}>
                    : {props.route.params.dataTransaksi.phone}
                  </Text>
                  <Text numberOfLines={1} style={styles.textDetailTransaksi}>
                    : {props.route.params.dataTransaksi.item}
                  </Text>
                  <Text numberOfLines={1} style={styles.textDetailTransaksi}>
                    : {props.route.params.dataTransaksi.nickname}
                  </Text>
                  <Text numberOfLines={1} style={styles.textDetailTransaksi}>
                    : {props.route.params.dataTransaksi.id_game}
                  </Text>
                  <Text numberOfLines={1} style={styles.textDetailTransaksi}>
                    :{" "}
                    <NumberFormat
                      value={props.route.params.dataTransaksi.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Rp. "}
                      renderText={(value) => <Text>{value}</Text>}
                    />
                  </Text>
                  <Text numberOfLines={1} style={styles.textDetailTransaksi}>
                    : {props.route.params.dataTransaksi.payment}
                  </Text>
                  <Text numberOfLines={1} style={styles.textDetailTransaksi}>
                    :{" "}
                    {props.route.params.dataTransaksi.status == false
                      ? "Belum Dibayar"
                      : "Sudah Dibayar"}
                  </Text>
                </View>
              </View>
            </View>
            <Text style={styles.invoice}>
              Invoice: {props.route.params.dataTransaksi.id}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              //navigate to Home
              onPress={() => navigation.navigate("Home")}
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
      </View>
      <Footer />
    </ScrollView>
  );
};

export default Sukses;
