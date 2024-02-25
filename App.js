import React from 'react';
import {StatusBar} from 'react-native';

//Navigations
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Screens
import Attendance from './screens/Attendance';
import NewUser from './screens/NewUser';
import Home from './screens/Home';
import Fees from './screens/Fees';
import Students from './screens/Students';
import StudentList from './screens/StudentList';
import StudentDetails from './screens/StudentDetails';
import NewMaster from './screens/NewMaster';
import NewLocation from './screens/NewLocation';
import AdminPanel from './screens/AdminPanel';
import Login from './screens/Login';
import LoginForm from './screens/LoginForm';
import ViewFees from './screens/ViewFees';
import ViewAttendance from './screens/ViewAttendance';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      {/* Lisht Statusbar */}
      <StatusBar
        backgroundColor="rgba(239,239,239,1)"
        barStyle="dark-content"
      />

      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginForm"
          component={LoginForm}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ViewFees"
          component={ViewFees}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ViewAttendance"
          component={ViewAttendance}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Students"
          component={Students}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StudentDetails"
          component={StudentDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StudentList"
          component={StudentList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NewUser"
          component={NewUser}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NewLocation"
          component={NewLocation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NewMaster"
          component={NewMaster}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AdminPanel"
          component={AdminPanel}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Fees"
          component={Fees}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Attendance"
          component={Attendance}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
