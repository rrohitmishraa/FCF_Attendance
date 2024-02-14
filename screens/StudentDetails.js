import { Image, Pressable, Text, View } from "react-native";
import Styles from "../Styles";

export default function StudentDetails({ navigation }) {
    return (
        <View style={Styles.parent}>
            <View style={Styles.navBar}>
                <Pressable onPress={() => navigation.goBack()}>
                    <Image style={Styles.btnBack} source={require("../images/imgBack.png")} />
                </Pressable>

                <Text style={Styles.heading}>Student Name</Text>
            </View>
        </View>
    );
}