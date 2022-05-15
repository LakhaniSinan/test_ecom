import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {Header, Button} from '../../components';
import {header_background, vh} from '../../constants';
import {AppContext} from '../../context';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import {baseUrl, send_code} from '../../api';

const Login = props => {
  useEffect(() => {
    if (Platform.OS == 'ios') {
      requestPermission();
    } else {
      requestPermissionAndroid();
    }
  }, []);

  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission();
  };
  const requestPermissionAndroid = async () => {
    const status = await messaging().hasPermission();
    console.log(status, 'STAUSTSS');
    if (status) {
      getToken();
    }
  };

  const context = useContext(AppContext);

  console.log(context, 'Register_Context');
  const {setUser} = context;
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    fcm: '',
  });
  // const [name, setName] = useSTate()

  const getToken = async () => {
    let token = await messaging().getToken();
    console.log(token, 'TOKENNNNNNNNNN');
    setInputs({...inputs, fcm: token});
  };
  const registerUser = () => {
    axios({
      url: send_code,
      method: 'POST',
      data: {email: inputs.email},
    })
      .then(res => {
        console.log(res.data, 'RESSSSSSSSs');
        ToastAndroid.showWithGravity(res.data.message,ToastAndroid.LONG,ToastAndroid.BOTTOM);
        props.navigation.navigate('ValidateCode', {data: inputs});
      })
      .catch(err => {
        console.log(err, 'errrrrrrrrrrrrrr');
      });
    // setUser('my name is login');
    // alert('login');
  };

  const onChangeHandler = (type, value) => {
    setInputs({...inputs, [type]: value});
  };

  console.log(inputs, 'IN');

  const renderTextInputs = (placeholder, type, keyboardType) => {
    return (
      <TextInput
        placeholder={placeholder}
        value={inputs[type]}
        onChangeText={text => onChangeHandler(type, text)}
        keyboardType={keyboardType}
        style={{
          paddingHorizontal: 10,
          borderWidth: 2,
          margin: 10,
          borderRadius: 10,
          borderColor: '#a3a3a3',
        }}
      />
      // <TextInput
      //     placeholder="Name"
      //     value={inputs.name}
      //     onChangeText={(text) => onChangeHandler("name", text)}
      // />
    );
  };

  console.log(inputs, 'INPUTTT');

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header heading="Register" />
      <View style={{marginTop: 10, marginLeft: 10}}>
        <Text
          style={{fontSize: 25, fontWeight: 'bold', color: header_background}}>
          Welcome To App !
        </Text>
        <Text
          style={{fontSize: 18, fontWeight: '400', color: header_background}}>
          Please Create your account To Continue
        </Text>
      </View>
      {/* <TextInput
                placeholder="Name"
                value={inputs.name}
                onChangeText={(text) => onChangeHandler("name", text)}
            /> */}
      <View style={{marginTop: vh * 0.03}}>
        {renderTextInputs('Write your Name', 'name')}
        {renderTextInputs('Email', 'email')}
        {/* {renderTextInputs('Enter your number', 'phoneNumber', 'numeric')} */}
        {renderTextInputs('Password', 'password')}
      </View>

      {/* 
            <TextInput
                placeholder="Email"
                value={inputs.email}
                onChangeText={(text) => onChangeHandler("email", text)}
            />
            <TextInput
                placeholder="Password"
                value={inputs.password}
                onChangeText={(text) => onChangeHandler("password", text)}
            /> */}

      <View
        style={{
          marginTop: 10,
          flex: 1,
          justifyContent: 'flex-end',
          marginBottom: 10,
        }}>
        <Button
          onPress={registerUser}
          title={'Register'}
          color={header_background}
        />
      </View>

      <TouchableOpacity onPress={() => props.navigation.navigate('LogIn')}>
        <Text style={{textAlign: 'center'}}> Have account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Login;
