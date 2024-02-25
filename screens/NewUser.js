import React, {useState} from 'react';
import Styles from '../Styles';
import {View, Image, Pressable, ScrollView, Text} from 'react-native';

import {TextInput, Button, RadioButton} from 'react-native-paper';

import {SafeAreaView} from 'react-native-safe-area-context';
import {db} from '../firebase';
import {doc, setDoc} from '@firebase/firestore';

import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

const NewUser = ({navigation}) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [contact, setContact] = useState('');
  const [age, setAge] = useState('');
  const [joinDate, setJoinDate] = useState('');
  const [blood, setBlood] = useState('');
  const [stuHeight, setStuHeight] = useState('');
  const [stuWeight, setStuWeight] = useState('');
  const [active, setActive] = useState('yes');
  const [myDoc, setMyDoc] = useState('');
  const [selected, setSelected] = useState(0);
  const [sending, setSending] = useState(false);

  const sendData = () => {
    setSending(true);
    if (
      name !== '' &&
      gender !== '' &&
      contact !== '' &&
      myDoc !== '' &&
      age !== '' &&
      joinDate !== '' &&
      stuHeight !== '' &&
      stuWeight !== '' &&
      blood !== ''
    ) {
      setDoc(doc(db, 'Users', contact), {
        name: name,
        gender: gender,
        contact: contact,
        age: age,
        joiningDate: joinDate,
        stuHeight: stuHeight,
        stuWeight: stuWeight,
        blood: blood,
        myDoc: myDoc,
        active: active,
        classLocation: storage.getString('classLocation'),
      })
        .then(() => {
          setName('');
          setGender('');
          setContact('');
          setAge('');
          setJoinDate('');
          setStuHeight('');
          setStuWeight('');
          setSelected(0);
          setBlood('');
          setMyDoc('');
          alert('Student Added', 'Student Added');
        })
        .then(() => {
          setSending(false);
        });
    } else {
      alert('Complete the details');
      setSending(false);
    }
  };

  return (
    <View style={Styles.parent}>
      <SafeAreaView>
        <View style={Styles.navBar}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image
              style={Styles.btnBack}
              source={require('../images/imgBack.png')}
            />
          </Pressable>

          <Text style={Styles.heading}>Add New Student</Text>
        </View>

        <ScrollView style={{height: '90%'}}>
          <TextInput
            mode="outlined"
            label={'Student Name'}
            style={Styles.textInput}
            value={name}
            onChangeText={name => setName(name)}
            autoFocus={true}
            onSubmitEditing={() => {
              this.contact.focus();
            }}
            blurOnSubmit={false}
          />

          <Text style={{marginBottom: 8, color: 'black', fontSize: 16}}>
            Gender
          </Text>

          <RadioButton.Group
            onValueChange={newValue => setGender(newValue)}
            value={gender}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <Text style={{color: 'black'}}>Male</Text>
              <RadioButton value="Male" />
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <Text style={{color: 'black'}}>Female</Text>
              <RadioButton value="Female" />
            </View>
          </RadioButton.Group>

          <TextInput
            mode="outlined"
            style={Styles.textInput}
            value={contact}
            label={'Contact'}
            onFocus={() => {
              if (selected === 0) {
                setSelected(1);
                setGender('Male');
              }
            }}
            onChangeText={contact => setContact(contact)}
            keyboardType="numeric"
            onSubmitEditing={() => {
              this.age.focus();
            }}
            ref={input => {
              this.contact = input;
            }}
            maxLength={10}
            blurOnSubmit={false}
          />

          <TextInput
            mode="outlined"
            label={'Age'}
            style={Styles.textInput}
            value={age}
            onChangeText={age => setAge(age)}
            onSubmitEditing={() => {
              this.joinDate.focus();
            }}
            ref={input => {
              this.age = input;
            }}
            keyboardType="numeric"
            maxLength={2}
            blurOnSubmit={false}
          />

          <TextInput
            mode="outlined"
            label={'Join Date'}
            style={Styles.textInput}
            value={joinDate}
            onChangeText={joinDate => setJoinDate(joinDate)}
            onSubmitEditing={() => {
              this.blood.focus();
            }}
            ref={input => {
              this.joinDate = input;
            }}
            blurOnSubmit={false}
          />

          <TextInput
            mode="outlined"
            style={Styles.textInput}
            value={blood}
            label={'Blood Type'}
            onChangeText={blood => setBlood(blood)}
            onSubmitEditing={() => {
              this.stuHeight.focus();
            }}
            ref={input => {
              this.blood = input;
            }}
            maxLength={3}
            blurOnSubmit={false}
          />

          <TextInput
            mode="outlined"
            style={Styles.textInput}
            value={stuHeight}
            label={'Height (CM)'}
            onChangeText={stuHeight => setStuHeight(stuHeight)}
            onSubmitEditing={() => {
              this.stuWeight.focus();
            }}
            ref={input => {
              this.stuHeight = input;
            }}
            keyboardType="numeric"
            maxLength={3}
            blurOnSubmit={false}
          />

          <TextInput
            mode="outlined"
            style={Styles.textInput}
            value={stuWeight}
            maxLength={3}
            label={'Weight (KG)'}
            onChangeText={stuWeight => setStuWeight(stuWeight)}
            placeholderTextColor={'grey'}
            keyboardType="numeric"
            onSubmitEditing={() => {
              this.myDoc.focus();
            }}
            ref={input => {
              this.stuWeight = input;
            }}
            blurOnSubmit={false}
          />

          <TextInput
            mode="outlined"
            style={Styles.textInput}
            value={myDoc}
            label={'Form Link'}
            onChangeText={myDoc => setMyDoc(myDoc)}
            placeholderTextColor={'grey'}
            ref={input => {
              this.myDoc = input;
            }}
          />

          <Button
            mode="contained"
            style={Styles.btnContainer}
            onPress={() => sendData()}>
            {sending ? 'ADDING STUDENT...' : 'ADD NEW STUDENT'}
          </Button>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default NewUser;
