import {FlatList, TouchableOpacity, View, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Styles from '../Styles';
import {Modal, Text} from 'react-native-paper';
import {doc, getDoc, collection} from '@firebase/firestore';
import {db} from '../firebase';
import {useEffect, useState} from 'react';
import {MMKV} from 'react-native-mmkv';
import {Calendar} from 'react-native-calendars';

export const storage = new MMKV();

const ViewAttendance = ({navigation, route}) => {
  const [feesList, setFeesList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const m = (currentDate.getMonth() + 1).toString();
  const day = currentDate.getDate().toString();
  const type = route.params;

  const month = [
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

  const [selectedMonth, setSelectedMonth] = useState(month[m - 1]);
  const [selectedYear, setSelectedYear] = useState(year);
  const [selectedDate, setSelectedDate] = useState(day);

  const fetchStudents = async (newYear, newMonth, newDate) => {
    try {
      const docRef = doc(collection(db, type.type), newYear, newMonth, newDate);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const mapData = docSnapshot.data();
        const a = Object.values(mapData);
        setFeesList(a);
      } else {
        alert('Document does not exist');
        setFeesList('');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      setFeesList('');
    }
  };

  const Item = ({title, index}) => {
    return (
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
          <Text style={[Styles.subText, {marginLeft: 0}]}>+91-{title[1]}</Text>
          {title[2] == 'P' ? (
            <Text
              style={[
                Styles.subText,
                {
                  marginBottom: 16,
                  marginLeft: 0,
                  fontWeight: 'bold',
                  color: 'green',
                },
              ]}>
              {title[2]}
            </Text>
          ) : (
            <Text
              style={[
                Styles.subText,
                {
                  marginBottom: 16,
                  marginLeft: 0,
                  fontWeight: 'bold',
                  color: 'red',
                },
              ]}>
              {title[2]}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    fetchStudents(selectedYear, selectedMonth, selectedDate);
  }, []);

  return (
    <View style={Styles.parent}>
      <SafeAreaView>
        <View style={Styles.navBar}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Image
              style={Styles.btnBack}
              source={require('../images/imgBack.png')}
            />
          </TouchableOpacity>

          <Text style={Styles.heading}>{type.type} List for </Text>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: 'black',
                paddingTop: 10,
                paddingBottom: 10,
                paddingRight: 20,
                paddingLeft: 20,
                borderRadius: 10,
              }}
              onPress={() => setShowModal(true)}>
              <Text style={[Styles.heading, {color: 'white', fontSize: 20}]}>
                {selectedDate + ' ' + selectedMonth + ', ' + selectedYear}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          style={{height: '90%'}}
          data={feesList}
          renderItem={({item, index}) => (
            <Item
              title={[item.name, item.contact, item.attendance]}
              index={index}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        <Modal
          visible={showModal}
          style={{
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'flex-end',
            padding: 20,
          }}>
          <Text
            style={{
              fontSize: 30,
              width: '100%',
              textAlign: 'center',
              marginBottom: 40,
            }}>
            Click on the date to select
          </Text>

          <Calendar
            onDayPress={date => {
              const newMonth = month[date['month'] - 1];
              const newYear = date.year.toString();
              const newDate = date.day.toString();

              setSelectedMonth(newMonth);
              setSelectedYear(newYear);
              setSelectedDate(newDate);

              setShowModal(false);
              fetchStudents(newYear, newMonth, newDate);
            }}
            minDate={'2024-01-01'}
            maxDate={'2040-12-31'}
            hideExtraDays={true}
          />
        </Modal>
      </SafeAreaView>
    </View>
  );
};

export default ViewAttendance;
