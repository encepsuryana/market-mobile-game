import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { authentication } from "../../firebase/Config";
import { useNavigation } from "@react-navigation/native";
import styles from "../../styles/Styles";

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
        <View style={styles.wrapper}>
          <View style={styles.textContainer}>
            <Text style={styles.titleHome}>
              Hi, {authentication.currentUser.email}
            </Text>
            <Text style={{ color: "#253B6E", marginVertical: 18 }}>
              Kamu sudah beli Item apa saja nih?
            </Text>
          </View>

          <TouchableOpacity onPress={handleSignOut} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AccountScreen;
