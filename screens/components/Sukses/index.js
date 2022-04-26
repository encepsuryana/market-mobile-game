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
} from "firebase/firestore";

import { useNavigation } from "@react-navigation/native";
import HeaderScreen from "../header/HeaderScreen";
import Banner from "../home/Banner";
import Icons from "react-native-vector-icons/MaterialIcons";
import Footer from "../footer/Footer";
import NumberFormat from "react-number-format";

const TextLeftTransaksi = (props) => {
  return <Text style={styles.textTransaksi}>{props.text}</Text>;
};

const TextRightTransaksi = (props) => {
  return <Text style={styles.textDetailTransaksi}>{props.text}</Text>;
};

const PaymenteWallet = (props) => {
  const [nomerAkun, setNomerAkun] = useState("");
  const nomerAkunRef = useRef();
  return (
    <View>
      <Text style={styles.textInputPayment}>
        Silahkan isi Nomor yang menggunakan akun: {props.pay}
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
                  <TextRightTransaksi
                    text={props.route.params.dataTransaksi.name}
                  />
                  <TextRightTransaksi
                    text={props.route.params.dataTransaksi.email}
                  />
                  <TextRightTransaksi
                    text={props.route.params.dataTransaksi.item}
                  />
                  <TextRightTransaksi
                    text={props.route.params.dataTransaksi.nickname}
                  />
                  <TextRightTransaksi
                    text={props.route.params.dataTransaksi.id_game}
                  />
                  <TextRightTransaksi
                    text={
                      <NumberFormat
                        value={props.route.params.dataTransaksi.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Rp. "}
                        renderText={(value) => <Text>{value}</Text>}
                      />
                    }
                  />

                  <TextRightTransaksi
                    text={props.route.params.dataTransaksi.payment}
                  />
                  <TextRightTransaksi
                    text={
                      props.route.params.dataTransaksi.status == false
                        ? "Belum Dibayar"
                        : "Sudah Dibayar"
                    }
                  />
                </View>
              </View>
            </View>
            <Text style={styles.invoice}>
              Invoice: {props.route.params.dataTransaksi.id}
            </Text>
          </View>

          <View style={styles.paymnetWrapper}>
            {/* render payment method */}
            {props.route.params.dataTransaksi.payment == "ATM Bersama" ? (
              <PaymentATMBersama norek="0890201821" />
            ) : props.route.params.dataTransaksi.payment == "OVO" ||
              props.route.params.dataTransaksi.payment == "Dana" ||
              props.route.params.dataTransaksi.payment == "Gopay" ? (
              <PaymenteWallet pay={props.route.params.dataTransaksi.payment} />
            ) : (
              <PaymentMiniMarket minimarket="Mini Market" />
            )}
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
