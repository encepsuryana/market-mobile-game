import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { authentication } from "../../firebase/Config";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles/Styles";

import HeaderScreen from "./header/HeaderScreen";
import Banner from "./home/Banner";
import Footer from "./footer/Footer";

const AccountScreen = () => {
  const navigation = useNavigation();
  const handleSignOut = () => {
    authentication
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.container}>
        <HeaderScreen />
        <Banner />

        <View style={styles.wrapper}>
          <TouchableOpacity onPress={handleSignOut} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
};

export default AccountScreen;
