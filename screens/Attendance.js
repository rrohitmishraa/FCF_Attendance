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
import { collection, getDocs, getDoc, setDoc, doc } from '@firebase/firestore'
import { db } from '../firebase'

const Attendance = ({ navigation, route }) => {
    const [stuList, setStuList] = useState([])
    const [attendanceList, setAttendanceList] = useState([]);
    const [dataPresent, setDataPresent] = useState(false);
    const [clicked, setClicked] = useState(false);
    const type = route.params;


    const currentDate = new Date();
    const year = currentDate.getFullYear().toString();
    const m = (currentDate.getMonth() + 1).toString();
    const day = currentDate.getDate().toString();

    let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const docRef = doc(collection(db, type.type), year, month[m - 1], day);

    const Present = async (userName) => {
        setClicked({ ...clicked, [userName]: true });
        setAttendanceList((prevAttendanceList) => [...prevAttendanceList, { userName, status: 'P' }]);
    }

    const Absent = async (userName) => {
        setClicked({ ...clicked, [userName]: true });
        setAttendanceList((prevAttendanceList) => [...prevAttendanceList, { userName, status: 'A' }]);
    }

    const sendAtt = async () => {
        try {
            const docSnap = await getDoc(docRef);
            let updatedAttendanceList = attendanceList;

            if (docSnap.exists()) {
                setDataPresent(true);
            } else {
                const initialAttendanceData = {};
                updatedAttendanceList.forEach((record) => {
                    initialAttendanceData[record.userName] = record.status;
                });
                await setDoc(docRef, initialAttendanceData);
            }

            setAttendanceList([]);
            alert('Attendance data sent successfully.');
        } catch (error) {
            console.error('Error updating attendance data:', error);
            alert('Error occurred while updating attendance data.');
        }
    }

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setDataPresent(true);
            } else {
                const colRef = collection(db, "Users");
                const q = await getDocs(colRef);

                setStuList(q.docs.map((doc) => ({
                    id: doc.id, ...doc.data()
                })));
            }
        } catch (error) {
            console.log(error)
        }
    };

    const Item = ({ title }) => (
        <View style={Styles.card}>
            <Text onPress={() => alert("Name")} style={Styles.subText}>{title[0]}</Text>

            {!clicked[title[1]] ? (
                <View style={Styles.btnAllign}>
                    <TouchableOpacity onPress={() => Absent(title[1])}>
                        <Image style={Styles.icon} source={require("../images/imgFalse.png")} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => Present(title[1])}>
                        <Image style={Styles.icon} source={require("../images/imgTrue.png")} />
                    </TouchableOpacity>
                </View>
            ) : null}
        </View>
    );

    return (
        <View style={Styles.parent}>
            <SafeAreaView style={{}}>
                <View style={Styles.navBar}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Image style={Styles.btnBack} source={require("../images/imgBack.png")} />
                    </Pressable>

                    <Text style={Styles.heading}> {type.type} Attendance</Text>
                </View>

                {!dataPresent ?
                    <FlatList
                        style={{ height: "90%" }}
                        data={stuList}
                        renderItem={({ item }) => <Item title={[item.name, item.contact]} />}
                        keyExtractor={item => item.id}
                    /> : <Text style={{ color: 'black', marginTop: 40, fontSize: 20, fontWeight: 'bold' }}>Attendance for today is done</Text>}
            </SafeAreaView >

            {!dataPresent ?
                <Pressable style={[Styles.floatingBtn, { width: 180, padding: 0 }]} onPress={() => sendAtt()}>
                    <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}> SAVE ATTENDANCE </Text>
                </Pressable> : null}
        </View >
    )
}

export default Attendance;