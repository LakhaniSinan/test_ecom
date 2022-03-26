import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { header_background, main_heading_font } from "../constants"

const Header = ({heading,color}) => {
   
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>{heading}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: header_background,
        justifyContent: "center",
        alignItems: "center",
    },
    textStyle: {
        fontSize: main_heading_font,
        fontWeight: "bold",
        color: "white"
    }
})



export default Header