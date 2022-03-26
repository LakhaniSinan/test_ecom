import AsyncStorage from "@react-native-async-storage/async-storage"
import React, { useContext, useState, useEffect } from "react"
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList } from "react-native"
import { vh } from "../../constants"
import { AppContext } from "../../context"
import Navigation from "../../navigation"
import { Rating, AirbnbRating } from 'react-native-ratings';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const allProducts = [
    {
        id: 0,
        name: "Product",
        price: 23,
        rating: 5,
        image: require("../../assets/images/home.png")
    },
    {
        id: 1,
        name: "Product",
        price: 23,
        rating: 3,
        image: require("../../assets/images/home.png")
    },
    {
        id: 2,
        name: "Product",
        price: 23,
        rating: 2,
        image: require("../../assets/images/home.png")
    },
    {
        id: 3,
        name: "Product",
        price: 23,
        rating: 5,
        image: require("../../assets/images/home.png")
    },
    {
        id: 4,
        name: "Product",
        price: 23,
        rating: 5,
        image: require("../../assets/images/home.png")
    },
    {
        id: 5,
        name: "Product",
        price: 23,
        rating: 5,
        image: require("../../assets/images/home.png")
    },
]

const AllProduct = ({ navigation: { navigate } }) => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        let tempArr = []
        setTimeout(() => {

            allProducts.map((res, index) => {
                tempArr.push(res)
            })
            setData(tempArr)
            setIsLoading(false)
        }, 1);
    })

    const context = useContext(AppContext)
    const { setUser, user } = context

    const logoutUser = () => {
        setUser(null)
        AsyncStorage.removeItem("isUser")
    }

    const renderItem = ({ item }) => {
        return (
            <View style={{
                width: "47%",
                marginHorizontal: 4,
                marginVertical: 10,
                backgroundColor: "#f85606",
                height: vh * 0.35,
            }}>
                <TouchableOpacity
                    onPress={() => navigate("ProductDetail")}
                >

                    <View style={{ justifyContent: "center", alignItems: "center", height: vh * 0.2 }}>
                        <Image style={{ height: 60, width: 60 }} resizeMode="contain" source={item.image} />
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>Name {item.name}</Text>
                        <Text style={{ fontSize: 14, color: "white", fontWeight: "bold" }}>Price {item.price} </Text>
                        <View style={{
                            height: vh * 0.09,
                            justifyContent: "flex-end"
                        }}>
                            <AirbnbRating
                                defaultRating={item.rating}
                                size={20}
                                showRating={false}
                                style={{ margin: 10 }}
                                starContainerStyle={{
                                    height: 20,
                                    backgroundColor: "#f85606"
                                }}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    let renderLoadingProducts = () => {
        return (
            <SkeletonPlaceholder style={{ marginTop: 5 }}>
                <View style={{
                    width: vh * 0.23,
                    height: vh * 0.23,
                    marginBottom: 10,
                    marginLeft: 5,
                }} />

            </SkeletonPlaceholder>
        )
    }


    return (
        <ScrollView style={{ flex: 1, backgroundColor: "white", marginBottom: 10 }}>
            <View style={{
                flexDirection: "row",
                flexWrap: "wrap",
                flex: 1
            }}>
                <FlatList
                    data={data}
                    renderItem={(item, index) => isLoading ? renderLoadingProducts(index) : renderItem(item, index)}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                />
            </View >
        </ScrollView >
    )
}

export default AllProduct