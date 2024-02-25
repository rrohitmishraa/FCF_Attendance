import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Styles from '../Styles';
import {MMKV} from 'react-native-mmkv';
import {getDoc, doc} from '@firebase/firestore';
import {db} from '../firebase';

export const storage = new MMKV();

const LoginForm = ({navigation}) => {
  const [data, setData] = useState('');
  const [contact, setContact] = useState(''); //9877876656
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      if (contact !== '' && pass !== '') {
        const docRef = doc(db, 'Masters', contact);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const masterData = docSnap.data();
          const master = {
            id: docSnap.id,
            ...masterData,
          };
          setData(master);

          if (data.password === pass) {
            storage.set('loggedIn', 'yes');
            storage.set('contact', contact);
            storage.set('classLocation', data.classLocation);
            navigation.replace('Home');
            setLoading(false);
          } else {
            alert('Invalid Password');
            setLoading(false);
          }
        } else {
          alert('No User Found');
          setLoading(false);
        }
      } else {
        alert('Fill in the Details');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching masters:', error);
      setLoading(false);
      return null;
    }
  };

  return (
    <SafeAreaView style={Styles.parent}>
      <View style={[{display: 'flex', flexDirection: 'row'}]}>
        <View>
          <Text style={{color: 'black', fontSize: 80, fontWeight: 900}}>
            LOGIN
          </Text>
        </View>
      </View>

      <View>
        <TextInput
          label="Phone Number"
          value={contact}
          onChangeText={contact => setContact(contact)}
          onSubmitEditing={() => {
            this.pass.focus();
          }}
          keyboardType="numeric"
          blurOnSubmit={false}
        />

        <TextInput
          label="Password"
          value={pass}
          onChangeText={pass => setPass(pass)}
          ref={input => {
            this.pass = input;
          }}
          secureTextEntry
        />
        <Button
          mode="contained"
          style={[Styles.btnContainer]}
          onPress={handleLogin}
          labelStyle={{color: 'white'}}>
          {loading ? 'WAIT...' : 'LOGIN'}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default LoginForm;
