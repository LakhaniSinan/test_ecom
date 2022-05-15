import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Header, Button} from '../../components';
import {header_background, vh} from '../../constants';
import {AppContext} from '../../context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {login_user} from '../../api';

const Login = props => {
  const context = useContext(AppContext);
  const {setUser, user} = context;
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  //   let xyz = {
  //     name: 'asdasd',
  //     id: 'asdasd',
  //     pass: 'asdsad',
  //   };
  // const [name, setName] = useSTate()

  const LoginUser = () => {
    const {email, password} = inputs;
    let params = {
      email,
      password,
      //   ...xyz,
    };
    axios({
      method: 'POST',
      url: login_user,
      data: params,
    })
      .then(res => {
          alert("Welcome to app")
        console.log(res.data.data.result, res.data.data.token, 'DATA=>>>>>>>>');
        setUser(res.data.data.result);
        AsyncStorage.setItem('userData', JSON.stringify(res.data.data.result));
        AsyncStorage.setItem('userToken', JSON.stringify(res.data.data.token));
      })
      .catch(err => {
        console.log(err, 'ERRRRRRRRRRRRR');
      });
    AsyncStorage.setItem('isUser', JSON.stringify(params));
  };

  const onChangeHandler = (type, value) => {
    setInputs({...inputs, [type]: value});
  };

  const renderTextInputs = (placeholder, state, secureTextEntry) => {
    console.log(inputs[state], 'EE');
    return (
      <TextInput
        placeholder={placeholder}
        onChangeText={text => onChangeHandler(state, text)}
        value={inputs[state]}
        secureTextEntry={secureTextEntry}
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

  console.log(inputs, 'INPUTTTtyttttttttttttttttt');

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Header heading="Login" />
      <View style={{marginTop: 10, marginLeft: 10}}>
        <Text
          style={{fontSize: 25, fontWeight: 'bold', color: header_background}}>
          Welcome Back !
        </Text>
        <Text
          style={{fontSize: 20, fontWeight: '400', color: header_background}}>
          Please Login To Continue
        </Text>
      </View>
      {/* <TextInput
                placeholder="Name"
                value={inputs.name}
                onChangeText={(text) => onChangeHandler("name", text)}
            /> */}
      <View style={{marginTop: vh * 0.05}}>
        {renderTextInputs('Enter your email', 'email', false)}
        {renderTextInputs('Enter your password', 'password', true)}
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

      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <View
          style={{
            marginTop: 10,
          }}>
          <Button
            onPress={LoginUser}
            title={'Log In'}
            color={header_background}
          />
        </View>

        <View style={{marginVertical: 10}}>
          <Text
            style={{
              textAlign: 'center',
              textDecorationLine: 'underline',
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            Or Continue with
          </Text>
        </View>

        <View
          style={{
            marginTop: 10,
          }}>
          <Button
            onPress={LoginUser}
            title={'Log In Facebook'}
            color="#3b5998"
          />
        </View>
        <View
          style={{
            marginTop: 10,
          }}>
          <Button onPress={LoginUser} title={'Log In Google'} color="#ffa500" />
        </View>

        <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
          <Text style={{textAlign: 'center'}}>
            {' '}
            Dont have account? Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Login;
