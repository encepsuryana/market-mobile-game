import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { authentication } from "../firebase/Config";
import { createUserWithEmailAndPassword } from "firebase/auth";

import styles from "../styles/Styles";

import Register from "../assets/register.png";

const RegisterScreen = () => {
  // const [username, setUsername] = useState("");
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

  const handleSignUp = () => {
    createUserWithEmailAndPassword(authentication, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;

        console.log("Login with: ", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Register</Text>
          <Text style={{ color: "#253B6E", paddingTop: 20, marginBottom: -20 }}>
            Dapatkan pengalaman yang luar biasa dengan bergabung bersama kami
          </Text>
        </View>
        <ImageBackground
          source={Register}
          resizeMode="contain"
          style={{
            height: 430,
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <View style={styles.inputContainer}>
            {/* disable   
          <TextInput
              placeholder="Username"
              value={username}
              onChangeText={(text) => setUsername(text)}
              style={styles.input}
            />
           */}
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
          <TouchableOpacity onPress={handleSignUp} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Register</Text>
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
          <Text style={styles.textQA}>
            *Syarat & Ketentuan berlaku, segala bentuk tindakan hukum akan kami
            proses kepihak yang berwajib
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
