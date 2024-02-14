import React, { useState } from 'react'
import Styles from '../Styles'
import {
    View,
    Image,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db } from '../firebase';
import { doc, setDoc } from '@firebase/firestore';

const NewUser = ({ navigation }) => {
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [contact, setContact] = useState("");
    const [age, setAge] = useState("");
    const [joinDate, setJoinDate] = useState("");
    const [stuHeight, setStuHeight] = useState("");
    const [stuWeight, setStuWeight] = useState("");
    const [selected, setSelected] = useState(0);

    const sendData = () => {
        if (name != "" && gender !== "" && contact !== "" && age !== "" && joinDate !== "" && stuHeight !== "" && stuWeight !== "") {
            setDoc(doc(db, "Users", contact), {
                name: name,
                gender: gender,
                contact: contact,
                age: age,
                joiningDate: joinDate,
                stuHeight: stuHeight,
                stuWeight: stuWeight,
            }).then(() => {
                setName("");
                setGender("")
                setContact("")
                setAge("")
                setJoinDate("")
                setStuHeight("")
                setStuWeight("")
                setSelected(0)
                Alert.alert("Student Added", "Student Added");
            })
        } else {
            alert("Complete the details")
        }
    }

    return (
        <View style={Styles.parent}>
            <SafeAreaView>
                <View style={Styles.navBar}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Image style={Styles.btnBack} source={require("../images/imgBack.png")} />
                    </Pressable>

                    <Text style={Styles.heading}>Add New Student</Text>
                </View>

                <ScrollView>
                    <TextInput
                        style={Styles.textInput}
                        value={name}
                        onChangeText={(name) => setName(name)}
                        placeholder='Student Name'
                        placeholderTextColor={'grey'}
                        autoFocus={true}
                        onSubmitEditing={() => { this.contact.focus() }}
                        blurOnSubmit={false} />

                    <Text style={{ marginBottom: 15, color: 'black', fontSize: 16 }}>Gender</Text>

                    <View style={[Styles.row, { marginBottom: 20 }]}>
                        <TouchableOpacity
                            style={Styles.row}
                            onPress={() => { setSelected(1); setGender("Male") }}
                            ref={(input) => { this.gender = input; }}>
                            <View style={[Styles.row]}>
                                <View style={Styles.radio}>
                                    {
                                        selected === 1 ? <View style={Styles.radioSelected}></View> : null
                                    }
                                </View>
                                <Text style={{ color: 'black' }}>Male</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={[Styles.row, { marginLeft: 30 }]} onPress={() => { setSelected(2); setGender("Female") }}>
                            <View style={[Styles.row]}>
                                <View style={Styles.radio}>
                                    {
                                        selected === 2 ? <View style={Styles.radioSelected}></View> : null
                                    }
                                </View>
                                <Text style={{ color: 'black' }}>Female</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <TextInput
                        style={Styles.textInput}
                        value={contact}
                        onFocus={() => {
                            if (selected === 0) {
                                setSelected(1);
                                setGender("Male")
                            }
                        }}
                        onChangeText={(contact) => setContact(contact)}
                        placeholder='Contact'
                        placeholderTextColor={'grey'}
                        keyboardType='numeric'
                        onSubmitEditing={() => { this.age.focus() }}
                        ref={(input) => { this.contact = input; }}
                        maxLength={10}
                        blurOnSubmit={false} />

                    <TextInput
                        style={Styles.textInput}
                        value={age}
                        onChangeText={(age) => setAge(age)}
                        placeholder='Age'
                        placeholderTextColor={'grey'}
                        onSubmitEditing={() => { this.joinDate.focus() }}
                        ref={(input) => { this.age = input; }}
                        keyboardType='numeric'
                        maxLength={2}
                        blurOnSubmit={false} />

                    <TextInput
                        style={Styles.textInput}
                        value={joinDate}
                        onChangeText={(joinDate) => setJoinDate(joinDate)}
                        placeholder='Date of Joining (DD/MM/YYY)'
                        placeholderTextColor={'grey'}
                        onSubmitEditing={() => { this.stuHeight.focus() }}
                        ref={(input) => { this.joinDate = input; }}
                        maxLength={3}
                        blurOnSubmit={false} />

                    <TextInput
                        style={Styles.textInput}
                        value={stuHeight}
                        onChangeText={(stuHeight) => setStuHeight(stuHeight)}
                        placeholder='Height (cm)'
                        placeholderTextColor={'grey'}
                        onSubmitEditing={() => { this.stuWeight.focus() }}
                        ref={(input) => { this.stuHeight = input; }}
                        keyboardType='numeric'
                        maxLength={3}
                        blurOnSubmit={false} />

                    <TextInput
                        style={Styles.textInput}
                        value={stuWeight}
                        onChangeText={(stuWeight) => setStuWeight(stuWeight)}
                        placeholder='Weight (KG)'
                        placeholderTextColor={'grey'}
                        keyboardType='numeric'
                        ref={(input) => { this.stuWeight = input; }} />

                    <Pressable style={Styles.btnContainer} onPress={() => sendData()}>
                        <Text style={Styles.btn}>
                            ADD NEW STUDENT
                        </Text>
                    </Pressable>
                </ScrollView>


            </SafeAreaView>
        </View >
    )
}

export default NewUser;