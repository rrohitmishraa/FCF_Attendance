import React from 'react'

//Navigations
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

//Screens
import Attendance from './screens/Attendance'
import NewUser from './screens/NewUser'
import Home from './screens/Home'
Fees
import { StatusBar } from 'react-native'
import Fees from './screens/Fees'
import Students from './screens/Students'
import StudentList from './screens/StudentList'
import StudentDetails from './screens/StudentDetails'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      {/* Lisht Statusbar */}
      <StatusBar
        backgroundColor='#efefef'
        barStyle='dark-content'
      />

      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
        <Stack.Screen name='Students' component={Students} options={{ headerShown: false }} />
        <Stack.Screen name='StudentDetails' component={StudentDetails} options={{ headerShown: false }} />
        <Stack.Screen name='StudentList' component={StudentList} options={{ headerShown: false }} />
        <Stack.Screen name='NewUser' component={NewUser} options={{ headerShown: false }} />
        <Stack.Screen name='Fees' component={Fees} options={{ headerShown: false }} />
        <Stack.Screen name='Attendance' component={Attendance} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer >
  )
}

export default App