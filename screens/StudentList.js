import React, { useEffect, useState } from 'react'
import Styles from '../Styles'

//Elements
import {
    View,
    Text,
    SafeAreaView,
    Pressable,
    Image,
    FlatList,
    TouchableOpacity,
} from 'react-native'
import { collection, getDocs } from '@firebase/firestore'
import { db } from '../firebase'

const StudentList = ({ navigation }) => {
    const [stuList, setStuList] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const colRef = collection(db, "Users");
            const q = await getDocs(colRef);

            setStuList(q.docs.map((doc) => ({
                id: doc.id, ...doc.data()
            })));
        } catch (error) {
            console.log(error)
        }
    };

    const Item = ({ title, index }) => {
        return (
            <TouchableOpacity style={Styles.card2} onPress={() => navigation.navigate("StudentDetails")}>
                <Text style={[Styles.subText, {
                    backgroundColor: 'black',
                    height: 20,
                    width: 20,
                    textAlign: 'center',
                    borderRadius: 50,
                    color: 'white'
                }]}>{index + 1}</Text>
                <View>
                    <Text style={[Styles.subText, { marginBottom: 0, marginLeft: 0, fontWeight: 'bold' }]}>{title[0]}</Text>
                    <Text style={[Styles.subText, { marginBottom: 16, marginLeft: 0 }]}>+91-{title[1]}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    function goBack() {
        navigation.goBack();
    }

    return (
        <View style={Styles.parent}>
            <SafeAreaView>
                <View style={Styles.navBar}>
                    <Pressable onPress={() => goBack()}>
                        <Image style={Styles.btnBack} source={require("../images/imgBack.png")} />
                    </Pressable>

                    <Text style={Styles.heading}> List of all Students</Text>
                </View>

                <FlatList
                    style={{ height: "90%" }}
                    data={stuList}
                    renderItem={({ item, index }) => <Item title={[item.name, item.contact]} index={index} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </SafeAreaView >
        </View >
    )
}

export default StudentList;