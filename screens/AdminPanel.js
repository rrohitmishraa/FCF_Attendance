import {Text, View} from 'react-native';
import Styles from '../Styles';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function AdminPanel() {
  return (
    <SafeAreaView style={Styles.parent}>
      <View>
        <Text style={Styles.heading}>Admin</Text>
        <Text style={Styles.heading}>Add New Location</Text>
        <Text style={Styles.heading}>Add New Master</Text>
      </View>
    </SafeAreaView>
  );
}
