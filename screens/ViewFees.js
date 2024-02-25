import {FlatList, TouchableOpacity, View, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Styles from '../Styles';
import {Text} from 'react-native-paper';
import {doc, getDoc} from '@firebase/firestore';
import {db} from '../firebase';
import {useEffect, useState} from 'react';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

const ViewFees = ({navigation}) => {
  const [feesList, setFeesList] = useState([]);
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const m = (currentDate.getMonth() + 1).toString();

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

  const fetchStudents = async () => {
    try {
      const docRef = doc(
        db,
        'Fees',
        year + ',' + month[m - 1] + '-' + storage.getString('classLocation'),
      );
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const mapData = docSnapshot.data();
        const a = Object.values(mapData);
        setFeesList(a);
      } else {
        console.log('Document does not exist');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
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
          <Text style={[Styles.subText, {marginBottom: 16, marginLeft: 0}]}>
            +91-{title[1]}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    fetchStudents();
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

          <Text style={Styles.heading}>Paid for {month[m - 1]}</Text>
        </View>

        <FlatList
          style={{height: '90%'}}
          data={feesList}
          renderItem={({item, index}) => (
            <Item title={[item.name, item.contact]} index={index} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    </View>
  );
};

export default ViewFees;
