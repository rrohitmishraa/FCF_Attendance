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
import {collection, getDocs, query, where} from '@firebase/firestore';
import {db} from '../firebase';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

const StudentList = ({navigation}) => {
  const [stuList, setStuList] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

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

  const Item = ({title, index}) => {
    return title[2] == 'yes' ? (
      <TouchableOpacity
        style={Styles.card2}
        onPress={() =>
          navigation.navigate('StudentDetails', {stuContact: title[1]})
        }>
        <Text
          style={[
            Styles.subText,
            {
              backgroundColor: 'black',
              height: 20,
              width: 20,
              textAlign: 'center',
              borderRadius: 50,
              color: 'white',
            },
          ]}>
          {index + 1}
        </Text>
        <View>
          <Text
            style={[
              Styles.subText,
              {marginBottom: 0, marginLeft: 0, fontWeight: 'bold'},
            ]}>
            {title[0]}
          </Text>
          <Text style={[Styles.subText, {marginBottom: 16, marginLeft: 0}]}>
            +91-{title[1]}
          </Text>
        </View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={Styles.card2}
        onPress={() =>
          navigation.navigate('StudentDetails', {stuContact: title[1]})
        }>
        <Text
          style={[
            Styles.subText,
            {
              backgroundColor: 'red',
              height: 20,
              width: 20,
              textAlign: 'center',
              borderRadius: 50,
              color: 'white',
            },
          ]}>
          {index + 1}
        </Text>
        <View>
          <Text
            style={[
              Styles.subText,
              {marginBottom: 0, marginLeft: 0, fontWeight: 'bold'},
            ]}>
            {title[0]}
          </Text>
          <Text style={[Styles.subText, {marginBottom: 16, marginLeft: 0}]}>
            +91-{title[1]}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={Styles.parent}>
      <SafeAreaView>
        <View style={Styles.navBar}>
          <Pressable onPress={navigation.goBack}>
            <Image
              style={Styles.btnBack}
              source={require('../images/imgBack.png')}
            />
          </Pressable>

          <Text style={Styles.heading}> List of all Students</Text>
        </View>

        <FlatList
          style={{height: '90%'}}
          data={stuList}
          renderItem={({item, index}) => (
            <Item
              title={[item.name, item.contact, item.active]}
              index={index}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    </View>
  );
};

export default StudentList;
