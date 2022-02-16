//expot stylesheet react native
import { Dimensions, StyleSheet } from "react-native";
var { height, width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#F2F4F7",
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
  buttonStyle: {
    borderRadius: 12,
    padding: 14,
    backgroundColor: "#E43A19",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  textQA: {
    fontSize: 10,
    color: "#253B6E",
    alignSelf: "center",
    textAlign: "center",
    marginVertical: 20,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    borderColor: "#253B6E",
    borderWidth: 2,
  },
  registerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 8,
  },

  buttonContainer: {
    marginTop: 40,
  },
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
    padding: 8,
  },
  titleCategories: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#253B6E",
    marginHorizontal: 8,
  },
  icoItem: {
    width: width / 6 - 20 - 8,
    height: width / 5 - 10 - 30,
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
    backgroundColor: "white",
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
  wrapperCategories: {
    paddingHorizontal: 12,
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
});
