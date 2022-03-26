import React, { useState, useContext } from "react"
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native"
import { Header, Button } from "../../components"
import { header_background, vh } from "../../constants"
import { AppContext } from "../../context"
const Login = (props) => {

    const context = useContext(AppContext)

    console.log(context, "Register_Context");
    const { setUser } = context
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        phoneNumber: ""
    })
    // const [name, setName] = useSTate()

    const registerUser = () => {
        setUser("my name is login")
        alert("login")
    }


    const onChangeHandler = (type, value) => {
        setInputs({ ...inputs, [type]: value })
    }



    const renderTextInputs = (placeholder, type, keyboardType) => {
        return (
            <TextInput
                placeholder={placeholder}
                value={inputs[type]}
                onChangeText={(text) => onChangeHandler(type, text)}
                keyboardType={keyboardType}
                style={{
                    paddingHorizontal: 10,
                    borderWidth: 2,
                    margin: 10,
                    borderRadius: 10,
                    borderColor: "#a3a3a3"
                }}
            />
            // <TextInput
            //     placeholder="Name"
            //     value={inputs.name}
            //     onChangeText={(text) => onChangeHandler("name", text)}
            // />
        )
    }


    console.log(inputs, "INPUTTT");

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <Header heading="Register" />
            <View style={{ marginTop: 10, marginLeft: 10 }}>
                <Text style={{ fontSize: 25, fontWeight: "bold", color: header_background }}>Welcome To App !</Text>
                <Text style={{ fontSize: 18, fontWeight: "400", color: header_background }}>Please Create your account To Continue</Text>
            </View>
            {/* <TextInput
                placeholder="Name"
                value={inputs.name}
                onChangeText={(text) => onChangeHandler("name", text)}
            /> */}
            <View style={{ marginTop: vh * 0.03 }}>
                {renderTextInputs("Write your Name", "name")}
                {renderTextInputs("Email", "email")}
                {renderTextInputs("Enter your number", "phoneNumber", "numeric")}
                {renderTextInputs("Password", "password")}
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

            <View style={{
                marginTop: 10
            }}>
                <Button onPress={registerUser} title={"Register"} color={header_background} />
            </View>

            <TouchableOpacity
                onPress={() => props.navigation.navigate("LogIn")}
            >
                <Text style={{ textAlign: "center" }}> Have account? Login</Text>
            </TouchableOpacity>

        </View>
    )
}


const styles = StyleSheet.create({

})

export default Login