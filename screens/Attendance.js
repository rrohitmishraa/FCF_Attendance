import React, {useEffect, useState} from 'react';
import Styles from '../Styles';

//Elements
import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  doc,
  query,
  where,
} from '@firebase/firestore';
import {db} from '../firebase';
import 'firebase/auth';

import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

const Attendance = ({navigation, route}) => {
  const [stuList, setStuList] = useState([]);
  const [attendanceList, setAttendanceList] = useState([]);
  const [clicked, setClicked] = useState(false);
  const type = route.params;

  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const m = (currentDate.getMonth() + 1).toString();
  const day = currentDate.getDate().toString();

  let month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const docRef = doc(collection(db, type.type), year, month[m - 1], day);

  const Present = async (contact, name) => {
    setClicked({...clicked, [contact]: true});
    setAttendanceList(prevAttendanceList => [
      ...prevAttendanceList,
      {
        contact,
        status: {
          classLocation: storage.getString('classLocation'),
          attendance: 'P',
          contact: contact,
          name: name,
        },
      },
    ]);
  };

  const Absent = async (contact, name) => {
    setClicked({...clicked, [contact]: true});
    setAttendanceList(prevAttendanceList => [
      ...prevAttendanceList,
      {
        contact,
        status: {
          classLocation: storage.getString('classLocation'),
          attendance: 'A',
          contact: contact,
          name: name,
        },
      },
    ]);
  };

  const sendAtt = async () => {
    try {
      let updatedAttendanceList = attendanceList;

      const initialAttendanceData = {};
      updatedAttendanceList.forEach(record => {
        initialAttendanceData[record.contact] = record.status;
      });
      await updateDoc(docRef, initialAttendanceData);

      setAttendanceList([]);
      alert('Attendance data sent successfully.');
    } catch (error) {
      console.error('Error updating attendance data:', error);
      alert('Error occurred while updating attendance data.');
    }
  };

  useEffect(() => {
    checkDB();
  }, []);

  const checkDB = async () => {
    try {
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(docRef, {});
        fetchStudents();
      } else {
        fetchStudents();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStudents = async () => {
    try {
      const colRef = collection(db, 'Users');
      const q = query(
        colRef,
        where('classLocation', '==', storage.getString('classLocation')),
      );
      const querySnapshot = await getDocs(q);

      const filteredStudents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setStuList(filteredStudents);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const Item = ({title}) => (
    <View style={Styles.card}>
      <Text
        onPress={() =>
          navigation.navigate('StudentDetails', {stuContact: title[1]})
        }
        style={Styles.subText}>
        {title[0]}
      </Text>

      {!clicked[title[1]] ? (
        <View style={Styles.btnAllign}>
          <TouchableOpacity onPress={() => Absent(title[1], title[0])}>
            <Image
              style={Styles.icon}
              source={require('../images/imgFalse.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => Present(title[1], title[0])}>
            <Image
              style={Styles.icon}
              source={require('../images/imgTrue.png')}
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );

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

          <View>
            <Text style={Styles.heading}>{type.type} Attendance</Text>
            <Text style={{fontSize: 18, color: 'grey'}}>
              {month[m - 1] + ' ' + day + ', ' + ' ' + year}
            </Text>
          </View>

          <TouchableOpacity
            style={{marginLeft: 'auto'}}
            onPress={() =>
              navigation.navigate('ViewAttendance', {type: type.type})
            }>
            <Image
              style={Styles.btnBack}
              source={require('../images/calendar.png')}
            />
          </TouchableOpacity>
        </View>

        <FlatList
          style={{height: '90%'}}
          data={stuList}
          renderItem={({item}) => <Item title={[item.name, item.contact]} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>

      <TouchableOpacity
        style={[Styles.floatingBtn, {width: 180, padding: 0}]}
        onPress={() => sendAtt()}>
        <Text style={{fontSize: 16, color: 'white', fontWeight: 'bold'}}>
          SAVE ATTENDANCE
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Attendance;
