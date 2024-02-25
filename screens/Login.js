import {useEffect} from 'react';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

const Login = ({navigation}) => {
  useEffect(() => {
    const isLoggedIn = storage.getString('loggedIn');

    isLoggedIn === 'yes'
      ? navigation.replace('Home')
      : navigation.replace('LoginForm');
  }, []);

  return null;
};

export default Login;
