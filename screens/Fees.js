import { FlatList, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import Styles from "../Styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { collection, getDocs, setDoc, getDoc, updateDoc, doc } from '@firebase/firestore'
import { db } from '../firebase'

export default Fees = ({ navigation }) => {
    const [stuList, setStuList] = useState([]);
    const [clicked, setClicked] = useState(false);

    const currentDate = new Date();
    const year = currentDate.getFullYear().toString();
    const m = (currentDate.getMonth() + 1).toString();

    let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const docRef = doc(collection(db, "Fees"), year + "," + month[m - 1]);

    const Paid = async (userName) => {
        try {
            await updateDoc(docRef, {
                [userName]: "Paid"
            });
            alert('Data Updated');
            setClicked({ ...clicked, [userName]: true });
        } catch (error) {
            console.error('Error updating attendance data:', error);
            alert('Error occurred while updating attendance data.');
        }
    }

    //List item
    const Item = ({ title }) => (
        <View style={Styles.card}>
            <Text onPress={() => alert("Name")} style={Styles.subText}>{title[0]}</Text>

            {!clicked[title[1]] ?
                <View style={Styles.btnAllign}>
                    <TouchableOpacity onPress={() => Paid(title[1])}>
                        <Image style={Styles.icon} source={require("../images/imgTrue.png")} />
                    </TouchableOpacity>
                </View> : null}
        </View>
    );

    useEffect(() => {
        checkDB();
    }, []);

    const checkDB = async () => {
        try {
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                await setDoc(docRef, {
                });

                fetchStudents();
            } else {
                fetchStudents();
            }
        } catch (error) {
            console.log(error)
        }
    }

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

    return (
        <View style={Styles.parent}>
            <SafeAreaView>
                <View style={Styles.navBar}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Image style={Styles.btnBack} source={require("../images/imgBack.png")} />
                    </Pressable>

                    <Text style={Styles.heading}>Fees</Text>
                </View>

                <FlatList
                    style={{ height: "90%" }}
                    data={stuList}
                    renderItem={({ item }) => <Item title={[item.name, item.contact]} />}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView >
        </View >
    )
}