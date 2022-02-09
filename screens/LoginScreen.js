import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { authentication } from "../firebase/Config";
import { signInWithEmailAndPassword } from "firebase/auth";

import styles from "../styles/Styles";

import Login from "../assets/login.png";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubcribe = authentication.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.email, " is signed in.");
        navigation.replace("Main");
      }
    });
    return unsubcribe;
  }, []);

  const handleSignIn = () => {
    signInWithEmailAndPassword(authentication, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with: ", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Login</Text>
          <Text style={{ color: "#253B6E", paddingTop: 20, marginBottom: -50 }}>
            Silahkan Login untuk mendapatkan pengalaman yang lebih seru
          </Text>
        </View>
        <ImageBackground
          source={Login}
          resizeMode="contain"
          style={{
            height: 430,
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={styles.input}
              secureTextEntry
            />
          </View>
        </ImageBackground>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleSignIn} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text>Belum punya akun?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              style={[styles.button, styles.buttonOutline]}
            >
              <Text style={styles.textRegister}>Daftar</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.textQA}>
            *Syarat & Ketentuan berlaku, segala bentuk tindakan hukum akan kami
            proses kepihak yang berwajib
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782f9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782f9",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#0782f9",
    fontSize: 16,
    fontWeight: "700",
  },
});
