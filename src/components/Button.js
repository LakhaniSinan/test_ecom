import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { header_background, main_heading_font } from "../constants"

const Button = ({ title, onPress,color }) => {

console.log("my name is javed");

    console.log("hi i am sinan");
    return (
        <View style={{...styles.container,backgroundColor:color}}>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.textStyle}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal:10,
        borderRadius:10
    },
    textStyle: {
        fontSize: main_heading_font,
        fontWeight: "bold",
        color: "white"
    }
})


export default Button