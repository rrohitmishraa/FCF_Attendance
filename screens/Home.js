import React from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Styles from '../Styles';
import {IconButton} from 'react-native-paper';

export default function Home({navigation}) {
  return (
    <ImageBackground source={require('../images/bg.jpg')}>
      <View style={Styles.parent}>
        <View style={[{display: 'flex', flexDirection: 'row'}]}>
          <View>
            <Text style={{color: 'black', fontSize: 80, fontWeight: 900}}>
              FCF
            </Text>
            <Text style={{color: 'black', fontSize: 80, fontWeight: 900}}>
              MMA
            </Text>
          </View>

          <IconButton
            icon={require('../images/admin.png')}
            iconColor={'black'}
            size={30}
            onPress={() => navigation.navigate('AdminPanel')}
            style={{height: 40, marginLeft: 'auto', marginTop: 20}}
          />
        </View>

        <ScrollView>
          <Pressable
            style={Styles.btnSelect}
            onPress={() => navigation.navigate('Students')}>
            <Image
              style={Styles.centerBtn}
              source={require('../images/addStudent.png')}
            />
            <View>
              <Text style={Styles.centerBtnTxt}> Student </Text>
              <Text style={{color: 'grey'}}> Add Student </Text>
              <Text style={{color: 'grey'}}> Check Student Details </Text>
            </View>
          </Pressable>

          <Pressable
            style={Styles.btnSelect}
            onPress={() => navigation.navigate('Fees')}>
            <Image
              style={Styles.centerBtn}
              source={require('../images/fees.png')}
            />
            <View>
              <Text style={Styles.centerBtnTxt}> Fees </Text>
              <Text style={{color: 'grey'}}> Mark fees </Text>
              <Text style={{color: 'grey'}}> Check fees details </Text>
            </View>
          </Pressable>

          <Pressable
            style={Styles.btnSelect}
            onPress={() =>
              navigation.navigate('Attendance', {type: 'Morning'})
            }>
            <Image
              style={Styles.centerBtn}
              source={require('../images/morning.png')}
            />
            <View>
              <Text style={Styles.centerBtnTxt}> Morning Attendance </Text>
              <Text style={{color: 'grey'}}> Mark Attendance</Text>
              <Text style={{color: 'grey'}}> for Morning Class </Text>
            </View>
          </Pressable>

          <Pressable
            style={Styles.btnSelect}
            onPress={() =>
              navigation.navigate('Attendance', {type: 'Evening'})
            }>
            <Image
              style={Styles.centerBtn}
              source={require('../images/evening.png')}
            />
            <View>
              <Text style={Styles.centerBtnTxt}> Evening Attendance </Text>
              <Text style={{color: 'grey'}}> Mark Attendance </Text>
              <Text style={{color: 'grey'}}> for Evening Class </Text>
            </View>
          </Pressable>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
