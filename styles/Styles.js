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

  image: {
    resizeMode: "contain",
    marginTop: 42,
    left: -80,
  },
  imageBanner: {
    width: "100%",
    height: height * 0.2,
    borderRadius: 12,
    marginVertical: 12,
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
    width: "80%",
    display: "flex",
    alignSelf: "center",
  },
  registerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 8,
  },

  buttonContainer: {
    display: "flex",
    alignContent: "stretch",
    justifyContent: "flex-end",
    marginTop: height * 0.1,
  },
  buttonCartContainer: {},
  textRegister: {
    marginLeft: 5,
    color: "#E43A19",
    fontWeight: "bold",
  },

  wrapperBanner: {
    alignItems: "center",
    marginVertical: -20,
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
  textCart: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#253B6E",
  },
  priceCart: {
    fontSize: 32,
    marginTop: 22,
    fontWeight: "bold",
    color: "#253B6E",
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
    borderColor: "#E43A19",
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
    paddingHorizontal: 8,
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

  wrapperJudulTransakasi: {
    padding: 12,
    marginTop: -20,
  },
  textDetailTransaksi: {
    fontSize: 16,
    color: "#253B6E",
    marginTop: 8,
  },
  textDetailTransaksi1: {
    fontSize: 16,
    color: "#253B6E",
    fontWeight: "bold",
    marginTop: 8,
  },
});
