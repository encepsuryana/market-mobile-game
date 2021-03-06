//expot stylesheet react native
import { Dimensions, StyleSheet } from "react-native";
var { height, width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F2F4F7",
  },
  containerFooter: {
    flex: 1,
    marginBottom: 90,
  },
  wrapper: {
    padding: 37,
    display: "flex",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#253B6E",
  },
  titleEmpty: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#253B6E",
    textAlign: "center",
  },
  textContainerHome: {
    display: "flex",
    paddingHorizontal: 18,
    paddingTop: 12,
  },
  titleHome: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#253B6E",
  },
  titleGameCart: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#253B6E",
    paddingBottom: 10,
  },

  titleATM: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#253B6E",
    paddingBottom: 10,
    textAlign: "center",
  },

  image: {
    resizeMode: "contain",
    marginTop: 42,
    left: -80,
  },
  imageBanner: {
    width: "100%",
    height: height * 0.2,
    borderRadius: 12,
    marginBottom: 12,
  },

  buttonStyle: {
    borderRadius: 12,
    padding: 14,
    backgroundColor: "#E43A19",
    alignItems: "center",
    borderColor: "#E43A19",
    borderWidth: 1,
  },
  buttonIcons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  subTitle: {
    color: "#253B6E",
    paddingTop: 5,
    fontSize: 16,
  },
  subTitleSplash: {
    color: "#253B6E",
    paddingTop: 5,
    fontSize: 16,
  },
  startedSttyle: {
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#E43A19",
    alignItems: "center",
  },

  buttonSecondaryStyle: {
    borderRadius: 12,
    padding: 14,
    backgroundColor: "#F2F4F7",
    alignItems: "center",
    borderColor: "#E43A19",
    borderWidth: 1,
    marginTop: 12,
  },

  buttonSecondaryText: {
    color: "#E43A19",
    fontSize: 18,
    fontWeight: "bold",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  textQA: {
    fontSize: 12,
    color: "#E43A19",
    alignSelf: "center",
    textAlign: "center",
    marginVertical: 20,
  },

  descCart: {
    fontSize: 14,
    color: "#E43A19",
    alignSelf: "center",
    textAlign: "center",
    marginVertical: 20,
  },

  input: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    marginTop: 5,
    borderColor: "#253B6E",
    borderWidth: 2,
    fontSize: 16,
  },

  inputContainer: {
    marginBottom: -70,
  },

  line: {
    borderBottomColor: "#253B6E",
    borderBottomWidth: 1,
    opacity: 0.2,
    marginVertical: 20,
    width: "100%",
    display: "flex",
  },
  registerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 8,
  },

  buttonCartContainer: {
    marginVertical: 8,
  },

  buttonContainer: {
    display: "flex",
    alignContent: "stretch",
    justifyContent: "flex-end",
    marginTop: height * 0.1,
  },
  textRegister: {
    marginLeft: 5,
    color: "#E43A19",
    fontWeight: "bold",
  },

  wrapperBanner: {
    alignItems: "center",
    marginVertical: -30,
    paddingBottom: 20,
  },

  Categories: {
    borderRadius: 12,
    padding: 6,
  },
  titleCategories: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#253B6E",
    paddingHorizontal: 10,
    marginVertical: 8,
  },
  wrapperCategories: {
    paddingRight: -52,
    paddingLeft: 14,
  },

  itemTopup: {
    paddingHorizontal: 12,
  },

  icoItem: {
    width: width / 6 - 20 - 8,
    height: width / 5 - 10 - 30,
    resizeMode: "contain",
  },
  ItemStyle: {
    width: width / 2 - 25,
    padding: 12,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#D2ECF9",
    flexWrap: "wrap",
    alignContent: "center",
    alignItems: "center",
  },
  textTopup: {
    marginLeft: 12,
    width: 90,
  },
  topupItem: {
    fontSize: 14,
  },
  topupPrice: {
    fontWeight: "bold",
    fontSize: 16,
    color: "green",
  },
  wrapperTopupItems: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 12,
  },

  textLoading: {
    fontSize: 16,
    color: "#253B6E",
    textAlign: "center",
    marginVertical: 20,
  },
  wrapperLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapperCart: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  cartWrapper: {
    backgroundColor: "#D2ECF9",
    paddingHorizontal: 12,
    paddingVertical: 24,
    borderRadius: 12,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  transactionWrapper: {
    backgroundColor: "#D2ECF9",
    padding: 8,
    borderRadius: 12,
    marginVertical: 8,
    flexWrap: "wrap",
  },

  transactionBody: {
    flex: 1,
    flexDirection: "row",
  },

  textCart: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#253B6E",
  },
  titleGame: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#253B6E",
  },

  wrapperSukses: {
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  invoice: {
    fontSize: 14,
    color: "#253B6E",
    fontStyle: "italic",
    marginTop: 4,
  },

  invoiceATM: {
    fontSize: 18,
    color: "#253B6E",
    fontStyle: "italic",
    marginTop: 4,
  },
  priceCart: {
    fontSize: 42,
    marginTop: 22,
    fontWeight: "bold",
    color: "#253B6E",
  },
  wrapperTextGame: {
    marginVertical: 8,
    paddingHorizontal: 8,
  },
  wrapperForm: {
    padding: 12,
  },
  wrapperInput: {
    marginVertical: 12,
  },
  wrapperEmpty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapperDescription: {
    backgroundColor: "#D2ECF9",
    padding: 12,
    borderRadius: 12,
  },
  textDescription: {
    fontSize: 14,
    color: "#253B6E",
    textAlign: "justify",
  },

  imagePayment: {
    width: width * 0.2,
    height: 40,
    resizeMode: "contain",
  },

  paymentImageWrapper: {
    width: width / 3 - 35,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  paymentImageWrapperCart: {
    width: width / 2 - 45,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "#F2F4F7",
    borderRadius: 12,
    borderColor: "#E43A19",
    borderWidth: 1,
    padding: 12,
  },

  paymentImageWrapperCartSelected: {
    width: width / 2 - 45,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "#D2ECF9",
    borderRadius: 12,
    borderColor: "#D2ECF9",
    borderWidth: 1,
    padding: 12,
  },

  paymentWrapper: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 18,
    marginHorizontal: 18,
    paddingHorizontal: 12,
    justifyContent: "center",
    backgroundColor: "#D2ECF9",
    borderRadius: 12,
  },

  wrapperPayment: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 18,
    justifyContent: "center",
  },

  wrapperFooter: {
    marginVertical: 12,
  },

  // Transaksi Berhasil
  wrapperTransaksi: {
    padding: 12,
    backgroundColor: "#D2ECF9",
    borderRadius: 12,
  },
  bodyTransaksi: {
    marginVertical: 8,
    paddingHorizontal: 22,
    justifyContent: "center",
  },
  judulTransaksi: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#253B6E",
    marginBottom: 12,
  },
  subJudulTransaksi: {
    fontSize: 16,
    color: "#253B6E",
    marginBottom: 12,
  },

  wrapperDetailTransaksi: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  wrapperDetailTransaksiLeft: {
    width: width / 2 - 90,
  },
  wrapperDetailTransaksiRight: {
    width: width / 2 - 30,
  },

  notPayment: {
    backgroundColor: "red",
    color: "red",
  },

  wrapperJudulTransakasi: {
    padding: 12,
    marginTop: -20,
  },
  textDetailTransaksi: {
    fontSize: 16,
    color: "#253B6E",
    marginTop: 8,
  },
  textTransaksi: {
    fontSize: 16,
    color: "#253B6E",
    fontWeight: "bold",
    marginTop: 8,
  },
  paymnetWrapper: {
    marginVertical: 22,
  },
  textInputPayment: {
    fontSize: 16,
    color: "#253B6E",
    marginBottom: 12,
  },

  imgTransaksi: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  namaGameTransaksi: {
    fontSize: 16,
    fontWeight: "500",
    color: "#253B6E",
    width: width * 0.6,
  },

  trasaksiInvalid: {
    backgroundColor: "red",
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 10,
    height: 20,
    width: 143,
    justifyContent: "center",
    marginTop: 2,
  },
  transaksiValid: {
    backgroundColor: "green",
    //border radius
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 10,
    height: 20,
    justifyContent: "center",
    marginTop: 2,
    width: 60,
  },

  textTransaksi: {
    color: "#fff",
    fontSize: 12,
  },

  wrapperTransaksiRight: {
    marginLeft: 20,
    //center
    justifyContent: "center",
  },
  wrapperDetailTransaksi: {
    marginTop: 8,
  },

  textPriceTransaksi: {
    fontSize: 18,
    color: "#253B6E",
    fontWeight: "bold",
  },

  titleTransaksi: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#253B63",
    marginLeft: 10,
  },
});
