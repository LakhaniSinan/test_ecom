import React, { Component } from 'react';
import {
    View,
    Dimensions,
    SafeAreaView,
    StyleSheet,
    Animated,
    TouchableWithoutFeedback,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import * as shape from 'd3-shape';

const { width } = Dimensions.get('window');
const height = 60;
const tabs = [
    {
        image: require("../../assets/images/home.png"),
        name: "Home",

    },
    {
        image: require("../../assets/images/notification.png"),
        name: "Notification"
    },
    {
        image: require("../../assets/images/cart.jpg"),
        name: "Cart"

    },

    {
        image: require("../../assets/images/member.png"),
        name: "Profile"
    },

];
const tabWidth = width / tabs.length;
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const left = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)([
        { x: 0, y: 0 },
        { x: width, y: 0 },
    ]);

const tab1 = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(shape.curveBasis)([
        { x: width - 10, y: 0 },
        { x: width + 5, y: 0 },
        { x: width + 15, y: 10 },
        { x: width + tabWidth / 2 - 20, y: (height / 3) * 2 },
        { x: width + tabWidth / 2 + 20, y: (height / 3) * 2 },
        { x: width + tabWidth - 15, y: 10 },
        { x: width + tabWidth - 5, y: 0 },
        { x: width + tabWidth + 10, y: 0 },
    ]);

const right = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)([
        { x: width + tabWidth, y: 0 },
        { x: width * 2 + tabWidth, y: 0 },
        { x: width * 2 + tabWidth, y: height },
        { x: 0, y: height },
        { x: 0, y: 0 },
    ]);

const d = `${left} ${tab1} ${right}`;

export default class tabBar extends Component {
    value = new Animated.Value(-width);
    constructor(props) {
        super(props)
    }
    render() {
        const { value } = this;
        return (
            <View style={styles.container}>
                <View {...{ width }} style={{ backgroundColor: 'transparent' }}>
                    <AnimatedSvg
                        width={width * 2 + tabWidth}
                        {...{ height }}
                        style={{
                            transform: [{ translateX: value }],
                        }}>
                        <Path key="path" {...{ d }} fill="white" />
                    </AnimatedSvg>
                    <View style={StyleSheet.absoluteFill}>
                        <StaticTabBar navigation={this.props.navigation} {...{ value }} {...this.props} />
                    </View>
                    <SafeAreaView style={styles.safeArea} />
                </View>
            </View>
        );
    }
}

class StaticTabBar extends Component {
    constructor(props) {
        super(props);
        this.value = tabs.map(
            (item, index) => new Animated.Value(index === 0 ? 1 : 0),
        );
    }

    componentDidMount() {
        // this.props.navigation.addListener("focus", () => {
        //     this.onPress(this.props?.index)
        // })
        // this.onPress(this.props?.index)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
    }

    onPress = (index, name) => {
        const { Itemindex } = this.props
        // alert(index)
        const { value } = this.props;
        Animated.parallel([
            Animated.parallel([
                ...this.value.map((item, i) => {
                    if (index !== i) {
                        return Animated.timing(item, {
                            toValue: 0,
                            duration: 400,
                            useNativeDriver: true,
                        });
                    }
                }),
            ]),

            Animated.parallel([
                Animated.timing(value, {
                    toValue: -width + tabWidth * index,
                    useNativeDriver: true,
                    duration: 450,
                }),

                ...this.value.map((item, i) => {
                    if (index === i) {
                        return Animated.timing(item, {
                            toValue: 1,
                            duration: 400,
                            useNativeDriver: true,
                        });
                    }
                }),
            ]),
        ]).start()
    };

    handleNavigation = (index, name) => {
        this.onPress(index)
        this.props.navigation.navigate(name)
    }

    render() {
        const { value } = this.props;
        return (
            <View style={styles.container1}>
                {tabs.map(({ image, name }, index) => {
                    const activeValue = this.value[index];
                    const opacity = value.interpolate({
                        inputRange: [
                            -width + tabWidth * (index - 1),
                            -width + tabWidth * index,
                            -width + tabWidth * (index + 1),
                        ],
                        outputRange: [1, 0, 1],
                        extrapolate: 'clamp',
                    });
                    const translateIcons = value.interpolate({
                        inputRange: [
                            -width + tabWidth * (index - 1),
                            -width + tabWidth * index,
                            -width + tabWidth * (index + 1),
                        ],
                        outputRange: [0, 10, 0],
                        extrapolate: 'clamp',
                    });
                    const translateY = activeValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [tabWidth, 0],
                    });
                    const opacityValue = activeValue.interpolate({
                        inputRange: [0, 0.7, 1],
                        outputRange: [0, 0, 1],
                    });
                    const translateX = value.interpolate({
                        inputRange: [
                            -width + tabWidth * (index - 1),
                            -width + tabWidth * index,
                            -width + tabWidth * (index + 1),
                        ],
                        outputRange: [-tabWidth, 0, tabWidth],
                    });
                    return (
                        <>
                            <Animated.View
                                style={[
                                    {
                                        left: index * tabWidth,
                                        width: tabWidth,
                                        transform: [{ translateY }, { translateX }],
                                        opacity: opacityValue,
                                    },
                                    styles.movingCircle,
                                ]}>
                                <View style={styles.circle}>
                                    <Animated.Image
                                        source={image}
                                        style={styles.activeIcon}
                                    />
                                </View>
                            </Animated.View>
                            <TouchableWithoutFeedback onPress={() => this.handleNavigation(index, name)}>
                                <View style={styles.active}>
                                    <Animated.Image
                                        source={image}
                                        style={{
                                            ...styles.inactive,
                                            opacity,
                                            transform: [{ translateY: translateIcons }],
                                        }}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        </>
                    );
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f85606"
    },
    safeArea: {
        backgroundColor: 'white',
    },
    container1: {
        height,
        width,
        flexDirection: 'row',
        flex: 1,
        // backgroundColor:"green",
    },
    circle: {
        height: 50,
        width: 50,
        borderRadius: 30,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,


    },
    movingCircle: {
        position: 'absolute',
        alignItems: 'center',
        top: -20,

    },
    inactive: {
        height: 25,
        width: 25,

        // tintColor: '#192f6a',
    },
    active: {
        width: tabWidth,
        height,
        // backgroundColor:"green",
        alignItems: 'center',
        justifyContent: 'center',

    },
    activeIcon: {
        height: 23,
        width: 23,
        tintColor: '#f85606',
        borderTopWidth: 1

    },
});