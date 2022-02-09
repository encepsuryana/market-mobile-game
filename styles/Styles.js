//expot stylesheet react native
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
});
