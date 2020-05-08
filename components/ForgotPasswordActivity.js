import React, { Component } from 'react';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import {
    AppRegistry,
    Alert,
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Image,
    ScrollView,
    ImageBackground,
    SafeAreaView
} from 'react-native';





class ForgotPasswordActivity extends Component {
    constructor(props) {
        super(props);
        // this.loginCall = this.loginCall.bind(this);
        this.state = {
            JSONResult: '',
            username: '',
            password: '',
            status: '',
            wholeResult: '',
            loading: '',
            baseUrl: 'http://kd.smeezy.com/api',
        };
    }

    CheckTextInput = () => {
        //Handler for the Submit onPress
        if (this.state.username != '') {
            //Check for the Name TextInput
        } else {
            alert('Please Enter Username');
        }
    };

    static navigationOptions = {
        title: 'Login Screen',
    };




    showLoading() {
        this.setState({ loading: true });
    }

    hideLoading() {
        this.setState({ loading: false });
    }

    render() {
        return (

            <ImageBackground style={styles.imgBackground}
                resizeMode='cover'
                source={require('../images/bg.png')}>


                <SafeAreaView style={styles.container}>


                    <ScrollView>


                        <Image style={styles.headerLogo}
                            source={require('../images/yys_shadow_logo.png')}>

                        </Image>
                        <Text style={styles.headerdescription}>SPONSORED BY YYS LEGAL FIRM OFFICE</Text>


                        <Text style={styles.forgotpasswordtext}>Please enter your registered email address, and we will send you a link to reset your password. </Text>



                        <View style={styles.datacontainer}>

                            <View style={styles.SectionStyle}>

                                <Image source={require('../images/email.png')}
                                    style={styles.ImageIconStyle} />

                                <TextInput
                                    placeholderTextColor="#C7E8F2"
                                    onChangeText={username => this.setState({ username })}
                                    placeholder={'Email'}
                                    underlineColorAndroid="transparent"
                                    style={styles.input}
                                />

                            </View>

                            <TouchableOpacity
                                style={styles.SubmitButtonStyle}
                                activeOpacity={.5}
                                onPress={() => this.props.navigation.navigate('Login')}>

                                <Text style={styles.fbText}> FORGOT PASSWORD </Text>

                            </TouchableOpacity>



                        </View>
                    </ScrollView>



                </SafeAreaView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5,
        //backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    datacontainer: {
        flex: 1,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        marginTop: 30,
        fontSize: 120,
        width: '100%',
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold'
    },
    headerdescription: {
        fontSize: RFValue(10, 580),
        textAlign: 'center',
        color: '#FFFFFF'
    },
    forgotpasswordtext: {
        marginTop: 40,
        fontSize: RFValue(12, 580),
        textAlign: 'center',
        marginLeft: 20,
        marginRight: 20,
        color: '#FFFFFF'
    },
    input: {
        color: '#ffffff',
        width: 300,
        height: 44,
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'transparent'
    },
    normalText: {
        fontSize: RFPercentage(2),
        textAlign: 'right',
        color: '#F0F5FE',
        marginRight: 35,
        alignSelf: 'flex-end',
        fontWeight: 'bold'
    },
    SubmitButtonStyle: {
        marginTop: 50,
        width: 300,
        height: 40,
        padding: 10,
        backgroundColor: '#E88000',
        borderRadius: 20,
        justifyContent: 'center',
        alignSelf: 'center',
        // Setting up View inside component align horizontally center.
        alignItems: 'center',
        fontWeight: 'bold',
    },
    skipbrowseText: {
        fontSize: 20,
        textAlign: 'right',
        color: '#F0F5FE',
        marginRight: 43,
        marginTop: 50,
        alignSelf: 'flex-end',
        fontWeight: 'bold'
    },
    fbText: {
        textAlign: 'center',
        fontSize: 15,
        color: 'white',
        alignContent: 'center',
        fontWeight: 'bold'
    },

    imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    ImageIconStyle: {
        height: 20,
        width: 25,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ImagelockIconStyle: {
        height: 28,
        width: 27,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderColor: '#C7E8F2',
        height: 40,
        borderRadius: 5,
        borderBottomWidth: 1,
        margin: 10,
        flexDirection: 'row'
    },
    headerLogo: {
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
});

export default ForgotPasswordActivity;