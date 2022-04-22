import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useRef } from "react";
import { authentication, provider } from "../firebase/Config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import Icon from "react-native-vector-icons/AntDesign";

import styles from "../styles/Styles";

import Login from "../assets/login.png";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

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

  const handleSignIn = async () => {
    //validate email and password
    if (email.length === 0) {
      Alert.alert("Login", "Email Harus diisi", [
        {
          text: "OK",
          onPress: () => {
            //focus on email input
            emailRef.current.focus();
          },
        },
      ]);
      return;
    }
    if (password.length === 0) {
      Alert.alert("Login", "Password Harus diisi", [
        {
          text: "OK",
          onPress: () => {
            //focus on email input
            passwordRef.current.focus();
          },
        },
      ]);
    }

    setIsLoading(true);
    //delay for 2 seconds
    setTimeout(() => {
      signInWithEmailAndPassword(authentication, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log("Logged in with: ", user.email);
        })
        .catch((error) => alert(error.message));
      setIsLoading(false);
    }, 1800);
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
      .then((re) => {
        console.log(re);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={120}>
        <View style={styles.wrapper}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.subTitle}>
              Silahkan Login untuk mendapatkan pengalaman yang lebih seru
            </Text>
          </View>
          <ImageBackground
            source={Login}
            resizeMode="contain"
            style={{
              height: 450,
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="johndoe@mail.com"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
                autoCapitalize="none"
                returnKeyType="next"
                ref={emailRef}
                onSubmitEditing={() => passwordRef.current.focus()}
                blurOnSubmit={false}
              />
              <TextInput
                placeholder="*********"
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
                secureTextEntry
                returnKeyType="done"
                ref={passwordRef}
                onSubmitEditing={handleSignIn}
              />

              <Text style={styles.textQA}>
                *Syarat & Ketentuan berlaku, segala bentuk tindakan hukum akan
                kami proses kepihak yang berwajib
              </Text>
            </View>
          </ImageBackground>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSignIn} style={styles.buttonStyle}>
              {isLoading ? (
                <View style={styles.buttonIcons}>
                  <Text style={styles.buttonText}>Loading...</Text>
                  <ActivityIndicator
                    style={{ marginLeft: 12 }}
                    size="small"
                    color="#fff"
                  />
                </View>
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>

            {/*
            <TouchableOpacity
              onPress={googleSignIn}
              style={styles.buttonSecondaryStyle}
            >
              <View style={styles.buttonIcons}>
                <Icon
                  style={{ marginRight: 12 }}
                  name="google"
                  size={20}
                  color="#E43A19"
                />
                <Text style={styles.buttonSecondaryText}>
                  Login dengan Google
                </Text>
              </View>
            </TouchableOpacity> 
            */}

            <View style={styles.registerContainer}>
              <Text>Belum punya akun?</Text>
              <TouchableOpacity
                onPress={() => navigation.replace("Register")}
                style={[styles.button, styles.buttonOutline]}
              >
                <Text style={styles.textRegister}>Daftar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
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
