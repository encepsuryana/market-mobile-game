import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { authentication } from "../../firebase/Config";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles/Styles";

import Footer from "./footer/Footer";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

const AccountScreen = () => {
  const navigation = useNavigation();
  const handleSignOut = () => {
    authentication
      .signOut()
      .then(() => {
        navigation.replace("Started");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <TouchableOpacity onPress={handleSignOut} style={styles.buttonStyle}>
            <View style={styles.buttonIcons}>
              <Icons
                name="logout"
                size={24}
                color="#fff"
                style={{ marginRight: 12 }}
              />
              <Text style={styles.buttonText}>Keluar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
};

export default AccountScreen;
