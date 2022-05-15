import axios from 'axios';
import React, {useState} from 'react';
import {View, TextInput, ToastAndroid} from 'react-native';
import {register_user} from '../../api';
import {Button} from '../../components';
import {header_background} from '../../constants';

const ValidateCode = ({route, navigation}) => {
  console.log(route, 'routerouteroute');
  const {name, password, fcm, email} = route.params.data;

  const [code, setCode] = useState('');

  const registerUser = () => {
    // console.log(route.p);
    let params = {
      ...route.params.data,
      username: route.params.data.name,
      code,
      image: 'https://amberstore.pk/uploads/662829057-6161ermet5l._sl1200_.jpg',
    };
    console.log(params, 'PARAMS=>>>>>>>>>>>');
    axios({
      method: 'POST',
      data: params,
      url: register_user,
    })
      .then(res => {
        console.log(res.data, 'RESSSSSSSSSSSSSSSS');
        ToastAndroid.showWithGravity(
          res.data.message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
        );
        navigation.navigate('LogIn');
      })
      .catch(err => {
        console.log(err.response.data, 'errrrrrrrrr=>>>>>');
        ToastAndroid.showWithGravity(
          err.response.data.message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
        );
      });
  };
  return (
    <View style={{flex: 1}}>
      <TextInput
        placeholder="Enter Your Code"
        value={code}
        style={{
          borderBottomWidth: 1,
        }}
        keyboardType="number-pad"
        onChangeText={text => setCode(text)}
      />
      <View style={{marginTop: 10}}>
        <Button
          onPress={registerUser}
          title={'Register User'}
          color={header_background}
        />
      </View>
    </View>
  );
};

export default ValidateCode;
