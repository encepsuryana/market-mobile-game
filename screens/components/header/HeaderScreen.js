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
    try {
      const user = query(
        collection(db, "users"),
        where("email", "==", authentication.currentUser.email)
      );

      const getUser = await getDocs(user);
      getUser.forEach((doc) => {
        setUser(doc.data().name);
        setUid(uid);
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={{ height: 50 }}>
      <View style={styles.textContainerHome}>
        <Text style={styles.titleHome}>
          Hi, {isLoading ? "Loading..." : user}
        </Text>
      </View>
    </View>
  );
};

export default HeaderScreen;
