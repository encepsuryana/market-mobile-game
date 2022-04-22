import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { authentication, db } from "../../../firebase/Config";
import styles from "../../../styles/Styles";
import { collection, query, where, getDocs } from "firebase/firestore";

const HeaderScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState("");
  const [uid, setUid] = useState("");

  //get name and uid from users collection in firestore base on email
  const getUser = async () => {
    setIsLoading(true);
    const user = query(
      collection(db, "users"),
      where("email", "==", authentication.currentUser.email)
    );

    const getUser = await getDocs(user);
    //delay 2 second
    setTimeout(() => {
      getUser.forEach((doc) => {
        // console.log(doc.data().name);
        // console.log(uid);
        setUser(doc.data().name);
        setUid(uid);
      });
      setIsLoading(false);
    }, 1800);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textContainerHome}>
        <Text style={styles.titleHome}>
          Hi, {isLoading ? "Loading..." : user}
        </Text>

        <Text style={{ color: "#253B6E", marginTop: 12 }}>
          Mau topup game apa nih? lagi ada promo sekarang loh
        </Text>
      </View>
    </View>
  );
};

export default HeaderScreen;
