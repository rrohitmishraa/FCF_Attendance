import React from 'react';
import {Image, ImageBackground, Pressable, Text, View} from 'react-native';
import Styles from '../Styles';

export default function Home({navigation}) {
  return (
    <ImageBackground source={require('../images/bg.jpg')}>
      <View style={Styles.parent}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 'auto',
            marginBottom: 150,
            justifyContent: 'space-around',
          }}>
          <Pressable
            style={Styles.btnSelect}
            onPress={() => navigation.navigate('AdminPanel')}>
            <Image
              style={Styles.centerBtn}
              source={require('../images/admin.png')}
            />
            <View>
              <Text style={Styles.centerBtnTxt}> Admin </Text>
            </View>
          </Pressable>

          <Pressable
            style={Styles.btnSelect}
            onPress={() => navigation.navigate('Students')}>
            <Image
              style={Styles.centerBtn}
              source={require('../images/addStudent.png')}
            />
            <View>
              <Text style={Styles.centerBtnTxt}> Student </Text>
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
            </View>
          </Pressable>

          <Pressable
            style={Styles.btnSelect}
            onPress={() => navigation.navigate('AttendanceScreen')}>
            <Image
              style={Styles.centerBtn}
              source={require('../images/attendance.png')}
            />
            <View>
              <Text style={Styles.centerBtnTxt}> Attendance </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}
