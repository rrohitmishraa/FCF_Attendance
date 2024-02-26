import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import Styles from '../Styles';

export default function AttendanceScreen({navigation}) {
  return (
    <View style={Styles.parent}>
      <View style={Styles.navBar}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            style={Styles.btnBack}
            source={require('../images/imgBack.png')}
          />
        </Pressable>

        <Text style={Styles.heading}>Attendance</Text>
      </View>
      <Pressable
        style={{
          backgroundColor: '#FFFFF7',
          borderRadius: 8,
          padding: 43,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('Attendance', {type: 'Morning'})}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          Morning Attendance
        </Text>
        <Image
          style={{
            height: 20,
            width: 30,
            marginLeft: 'auto',
          }}
          source={require('../images/rightArrow.png')}
        />
      </Pressable>

      <Pressable
        style={{
          backgroundColor: '#FFFFF7',
          borderRadius: 8,
          padding: 43,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
        }}
        onPress={() => navigation.navigate('Attendance', {type: 'Evening'})}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          Evening Attendance
        </Text>
        <Image
          style={{
            height: 20,
            width: 30,
            marginLeft: 'auto',
          }}
          source={require('../images/rightArrow.png')}
        />
      </Pressable>
    </View>
  );
}
