import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState, useRef } from "react";
import { authentication, db } from "../firebase/Config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, Timestamp } from "firebase/firestore";

import styles from "../styles/Styles";

import Register from "../assets/register.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const userRef = useRef();
  const phoneRef = useRef();

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

  const handleSignUp = async () => {
    //validate email and password

    if (name.length === 0) {
      Alert.alert("Register", "Nama Harus diisi", [
        {
          text: "OK",
          onPress: () => {
            //focus on email input
            userRef.current.focus();
          },
        },
      ]);
      return;
    }
    if (phone.length === 0) {
      Alert.alert("Register", "Nomer Telp. Harus diisi", [
        {
          text: "OK",
          onPress: () => {
            //focus on email input
            userRef.current.focus();
          },
        },
      ]);
      return;
    }
    if (email.length === 0) {
      Alert.alert("Register", "Email Harus diisi", [
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
      Alert.alert("Register", "Password Harus diisi", [
        {
          text: "OK",
          onPress: () => {
            //focus on password input
            passwordRef.current.focus();
          },
        },
      ]);
      return;
    }
    //delay for 2 seconds
    setIsLoading(true);
    setTimeout(() => {
      try {
        addDoc(collection(db, "users"), {
          name: name,
          email: email,
          phone: phone,
          created: Timestamp.now(),
        });

        createUserWithEmailAndPassword(authentication, email, password)
          .then((userCredentials) => {
            const user = userCredentials.user;
            // console.log("Logged in with: ", user.email);
          })
          .catch((error) => alert(error.message));
      } catch (error) {
        console.log("Register Error: ", error);
      }

      setIsLoading(false);
    }, 1800);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <KeyboardAwareScrollView enableOnAndroid={true} extraScrollHeight={120}>
        <View style={styles.wrapper}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Register</Text>
            <Text style={styles.subTitle}>
              Dapatkan pengalaman yang luar biasa dengan bergabung bersama kami
            </Text>
          </View>
          <ImageBackground
            source={Register}
            resizeMode="contain"
            style={{
              height: 450,
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="John Doe"
                value={name}
                onChangeText={(text) => setName(text)}
                style={styles.input}
                ref={userRef}
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current.focus()}
                blurOnSubmit={false}
              />
              <TextInput
                placeholder="johndoe@mail.com"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
                autoCapitalize="none"
                ref={emailRef}
                returnKeyType="next"
                onSubmitEditing={() => phoneRef.current.focus()}
                blurOnSubmit={false}
                keyboardType="email-address"
              />
              <TextInput
                placeholder="628123456789"
                value={phone}
                onChangeText={(text) => setPhone(text)}
                style={styles.input}
                autoCapitalize="none"
                ref={phoneRef}
                onSubmitEditing={() => passwordRef.current.focus()}
                blurOnSubmit={false}
                keyboardType="number-pad"
                maxLength={15}
                returnKeyType="next"
              />
              <TextInput
                placeholder="********"
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={styles.input}
                secureTextEntry
                ref={passwordRef}
                returnKeyType="done"
                onSubmitEditing={handleSignUp}
              />

              <Text style={styles.textQA}>
                *Syarat & Ketentuan berlaku, segala bentuk tindakan hukum akan
                kami proses kepihak yang berwajib
              </Text>
            </View>
          </ImageBackground>

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleSignUp} style={styles.buttonStyle}>
              {isLoading ? (
                <View style={styles.buttonIcons}>
                  <Text style={styles.buttonText}>Register</Text>
                  <ActivityIndicator
                    style={{ marginLeft: 12 }}
                    size="small"
                    color="#fff"
                  />
                </View>
              ) : (
                <Text style={styles.buttonText}>Register</Text>
              )}
            </TouchableOpacity>

            <View style={styles.registerContainer}>
              <Text>Sudah punya akun?</Text>
              <TouchableOpacity
                onPress={() => navigation.replace("Login")}
                style={[styles.button, styles.buttonOutline]}
              >
                <Text style={styles.textRegister}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

export default RegisterScreen;
