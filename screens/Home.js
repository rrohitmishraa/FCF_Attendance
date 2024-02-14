import React, { useEffect } from "react";
import { Image, Pressable, Text, View } from "react-native";
import Styles from "../Styles";

export default function Home({ navigation }) {
    return (
        <View style={Styles.parent}>
            <View style={Styles.navBar}>
                <Text style={Styles.heading}>FCF MMA</Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', height: '50%', justifyContent: 'space-between', alignItems: 'center' }}>
                <Pressable
                    style={Styles.btnSelect}
                    onPress={() => navigation.navigate('Students')}>
                    <Image style={Styles.centerBtn} source={require("../images/addStudent.png")} />
                    <Text style={Styles.centerBtnTxt}>New Student </Text>
                </Pressable>

                <Pressable
                    style={Styles.btnSelect}
                    onPress={() => navigation.navigate('Fees')}>
                    <Image style={Styles.centerBtn} source={require("../images/fees.png")} />
                    <Text style={Styles.centerBtnTxt}> Fees </Text>
                </Pressable>
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', height: '50%', justifyContent: 'space-between' }}>
                <Pressable
                    style={Styles.btnSelect}
                    onPress={() => navigation.navigate('Attendance', { type: 'Morning' })}>
                    <Image style={Styles.centerBtn} source={require("../images/morning.png")} />
                    <Text style={Styles.centerBtnTxt}> Morning Attendance </Text>
                </Pressable>

                <Pressable
                    style={Styles.btnSelect}
                    onPress={() => navigation.navigate('Attendance', { type: 'Evening' })}>
                    <Image style={Styles.centerBtn} source={require("../images/evening.png")} />
                    <Text style={Styles.centerBtnTxt}>Evening Attendance </Text>
                </Pressable>
            </View>
        </View >
    );
}