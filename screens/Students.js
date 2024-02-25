import React from 'react';
import {Image, Pressable, Text, TouchableOpacity, View} from 'react-native';
import Styles from '../Styles';

export default function Students({navigation}) {
  return (
    <View style={Styles.parent}>
      <View style={Styles.navBar}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            style={Styles.btnBack}
            source={require('../images/imgBack.png')}
          />
        </Pressable>

        <Text style={Styles.heading}>Students</Text>
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
        onPress={() => navigation.navigate('NewUser')}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          Add New Student{' '}
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
        onPress={() => navigation.navigate('StudentList')}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 16,
          }}>
          List of all Students{' '}
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
