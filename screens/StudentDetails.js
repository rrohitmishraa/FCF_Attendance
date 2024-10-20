import {Image, Linking, Pressable, Text, View} from 'react-native';
import Styles from '../Styles';
import {getDoc, doc} from '@firebase/firestore';
import {db} from '../firebase';
import {useEffect, useState} from 'react';

export default function StudentDetails({navigation, route}) {
  const [data, setData] = useState('');
  const stuContact = route.params.stuContact;

  const fetchStudent = async () => {
    try {
      const docRef = doc(db, 'Users', stuContact);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const studentData = docSnap.data();
        const student = {
          id: docSnap.id,
          ...studentData,
        };
        setData(student);
      } else {
        alert('No data');
      }
    } catch (error) {
      console.error('Error fetching student:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  OpenWeb = () => {
    Linking.openURL('https://wa.me/91' + data.contact + '?text=hello');
  };

  return (
    <View style={Styles.parent}>
      <View style={Styles.navBar}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            style={Styles.btnBack}
            source={require('../images/imgBack.png')}
          />
        </Pressable>

        <Text style={Styles.heading}>{data.name}</Text>
      </View>

      <View>
        <Text style={{color: 'black', fontSize: 18}}>
          Contact: {data.contact} {'\n'}
          Age: {data.age} {'\n'}
          Blood Group: {data.blood} {'\n'}
          Gender: {data.gender} {'\n'}
          Joining Date: {data.joiningDate} {'\n'}
          Height: {data.stuHeight} {'\n'}
          Weight: {data.stuWeight} {'\n'}
        </Text>

        <Pressable onPress={() => OpenWeb()}>
          <Image
            style={{height: 60, width: 60}}
            source={require('../images/whatsapp.png')}
          />
        </Pressable>
      </View>
    </View>
  );
}
