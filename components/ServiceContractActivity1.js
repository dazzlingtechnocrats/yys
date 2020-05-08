import React from 'react';
import { StyleSheet, View, ImageBackground, ScrollView, Text, TouchableOpacity, Image, TextInput,SafeAreaView } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import ActionButton from 'react-native-circular-action-menu';


export class ServiceContractActivity1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isOpen:false
        };
    }

    static navigationOptions = {
        title: 'Login Screen',
    };


    componentDidMount() {

        this.RBSheet1.open()

    }



    render() {
        return (

            <SafeAreaView style={styles.container}>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0F5FE', height: 60 }}>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { }} >

                        <Image source={require('../images/menu.png')}
                            style={styles.ImageIconStyle} />

                    </TouchableOpacity>


                    <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
                        onPress={() => { }} >

                        <Text style={styles.screenntitlestyle}>CONTRACT</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.navigate('Notification') }} >

                        <Image source={require('../images/notification.png')}
                            style={styles.ImageIconStyle}
                        />

                    </TouchableOpacity>
                </View>




                <ScrollView style={styles.scrollViewContainer}>
                    <View style={styles.scrollViewInsideContainer}>


                        <ImageBackground
                            style={{ borderRadius: 20, height: 200, width: '99%', marginLeft: 2, marginTop: 10 }}
                            imageStyle={{ borderRadius: 20 }}
                            source={require('../images/dashboard-2.png')}>

                            <Text style={{ color: '#ffffff', fontSize: RFValue(25, 580), marginTop: 20, marginLeft: 20, marginRight: 20 }}
                                onPress={() => { this.RBSheet1.open() }}>Service Contracts {'\n'}in Minutes</Text>

                            <Text style={{ color: '#ffffff', fontSize: RFPercentage(1.5), marginLeft: 20 }}
                                onPress={() => { this.RBSheet1.open() }}>Service contracts define agreements between {'\n'} customers and providers. </Text>


                        </ImageBackground>

                    </View>
                </ScrollView>


                <RBSheet
                    ref={ref => {
                        this.RBSheet1 = ref;
                    }}
                    onClose={()=>{
                        if(this.state.isOpen){
                            this.RBSheet2.open()
                        
                        }
                    } }
                    animationType={'fade'}
                    height={440}
                    duration={250}
                    closeOnPressMask={false}
                    closeOnDragDown={false}
                    closeOnPressBack={false}

                    customStyles={{
                        container: {
                            borderTopRightRadius: 20,
                            borderTopLeftRadius: 20,
                        }

                    }} >



                    <View style={{ flexDirection: 'column', marginLeft: 20, marginRight: 20, marginTop: 30, flex:1 }}>

                        <View style={{ flexDirection: 'row' }}>

                            <View style={{
                                backgroundColor: '#0093c8', borderTopLeftRadius: 10, borderTopRightRadius: 10, alignSelf: 'flex-end', height: 40, width: 40, justifyContent: 'center', alignItems: 'center', alignContent: 'center'
                            }}>
                                <Text style={{ color: 'white', fontSize: RFPercentage(1.7), fontWeight: 'bold' }}>1</Text>

                            </View>


                        </View>

                        <View style={styles.TextViewStyle}>

                            <Text style={styles.TextStyle}> you will now start answering a few questions. First, give a subject title to your order.</Text>

                        </View>

                        <TextInput
                            placeholder="Ex. ABC company"
                            underlineColorAndroid='transparent'
                            style={styles.TextInputStyleClass} />


                    </View>



                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom:100 }}>

                        <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => { }} >


                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
                            onPress={() => { }} >


                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: .20, alignContent: 'flex-end', justifyContent: 'center' }}
                            onPress={() => {
                                this.RBSheet1.close()
                                this.setState({ isOpen:true })
                            

                            }}>

                            <Image source={require('../images/orange-arrow.png')}
                                style={styles.actionIconStyle} />


                        </TouchableOpacity>

                    </View>

                </RBSheet>



                <RBSheet
                    ref={ref => {
                        this.RBSheet2 = ref;
                    }}
                    onClose={()=>{
                        this.props.navigation.navigate('ServiceContractScreen2')
                    } }
                    animationType={'fade'}
                    height={500}
                    duration={250}
                    closeOnPressMask={false}
                    closeOnDragDown={false}
                    closeOnPressBack={false}

                    customStyles={{
                        container: {
                            borderTopRightRadius: 20,
                            borderTopLeftRadius: 20,
                        }

                    }} >



                    <View style={{ flexDirection: 'column', marginLeft: 20, marginRight: 20, marginTop: 30 ,flex:1}}>

                        <View style={{ flexDirection: 'row' }}>

                            <View style={{
                                backgroundColor: '#0093c8', borderTopLeftRadius: 10, borderTopRightRadius: 10, alignSelf: 'flex-end', height: 40, width: 40, justifyContent: 'center', alignItems: 'center', alignContent: 'center'
                            }}>
                                <Text style={{ color: 'white', fontSize: RFPercentage(1.7), fontWeight: 'bold' }}>2</Text>

                            </View>


                        </View>

                        <View style={styles.TextViewStyle}>

                            <Text style={styles.TextStyle}> What is your business type.</Text>

                        </View>


                        <View style={{ flexDirection: 'row', marginTop: 20,
                    shadowOpacity: 0.8,  shadowRadius: 2,
                    shadowOffset: {
                      height: 1,
                      width: 1
                    } }}>


                            <View style={{
                                flex: .33, backgroundColor: '#ffffff', borderRadius: 20, justifyContent: 'center',  height: 90,
                                shadowColor: '#ecf6fb', elevation: 20, margin:10
                              
                            }}>

                                <View style={{ margin: 5, borderRadius: 10, alignSelf: 'center', padding: 10, height: 40, width: 40 }}>

                                    <Image source={require('../images/category-legal.png')}
                                        style={styles.categoryIconStyle} />
                                </View>

                                <Text style={{ color: '#0093C8', fontSize: RFPercentage(1.5),  textAlign: 'center' }}>LEGAL</Text>

                            </View>

                            <View style={{
                                flex: .33, backgroundColor: '#ffffff',  borderRadius: 20, justifyContent: 'center', height: 90,
                                shadowColor: '#ecf6fb', elevation: 20, margin:10
                            }}>


                                <View style={{ margin: 5, borderRadius: 10, alignSelf: 'center', padding: 10, height: 40, width: 40 }}>

                                    <Image source={require('../images/category-account.png')}
                                        style={styles.categoryIconStyle} />
                                </View>

                                <Text style={{ color: '#0093C8', fontSize: RFPercentage(1.5), textAlign: 'center' }}>ACCOUNTING</Text>

                            </View>

                            <View style={{
                                flex: .34, backgroundColor: '#ffffff',  borderRadius: 20, justifyContent: 'center', height: 90,
                                shadowColor: '#ecf6fb', elevation: 20,  margin:10
                            }}>

                                <View style={{ margin: 5, borderRadius: 10, alignSelf: 'center', padding: 10, height: 40, width: 40 }}>

                                    <Image source={require('../images/category-it.png')}
                                        style={styles.categoryIconStyle} />
                                </View>

                                <Text style={{ color: '#0093C8', fontSize: RFPercentage(1.5), textAlign: 'center' }}>IT SERVICE</Text>
                            </View>


                        </View>

                        <View style={{ flexDirection: 'row' , shadowOpacity: 0.8,  shadowRadius: 2,
                                shadowOffset: {
                                  height: 1,
                                  width: 1
                                }}}>


                            <View style={{
                                flex: .33, backgroundColor: '#ffffff',  borderRadius: 20, justifyContent: 'center',  height: 90
                                , shadowColor: '#ecf6fb', elevation: 20, margin:10
                            }}>

                                <View style={{  margin: 5, borderRadius: 10, alignSelf: 'center', padding: 10, height: 40, width: 40 }}>

                                    <Image source={require('../images/category-business.png')}
                                        style={styles.categoryIconStyle} />
                                </View>

                                <Text style={{ color: '#0093C8', fontSize: RFPercentage(1.5), textAlign: 'center' }}>BUSINESS</Text>

                            </View>

                            <View style={{
                                flex: .33, backgroundColor: '#ffffff', borderRadius: 20, justifyContent: 'center', height: 90,
                                shadowColor: '#ecf6fb', elevation: 20, margin:10
                            }}>

                                <View style={{  margin: 5, borderRadius: 10, alignSelf: 'center', padding: 10, height: 40, width: 40 }}>

                                    <Image source={require('../images/category-marketing.png')}
                                        style={styles.categoryIconStyle} />
                                </View>

                                <Text style={{ color: '#0093C8', fontSize: RFPercentage(1.5), textAlign: 'center' }}>MARKETING</Text>

                            </View>

                            <View style={{
                                flex: .34, backgroundColor: '#ffffff',  borderRadius: 20, justifyContent: 'center', height: 90,
                                shadowColor: '#ecf6fb', elevation: 20, margin:10
                            }}>


                                <View style={{  margin: 5, borderRadius: 10, alignSelf: 'center', padding: 10, height: 40, width: 40 }}>

                                    <Image source={require('../images/category-study.png')}
                                        style={styles.categoryIconStyle} />
                                </View>

                                <Text style={{ color: '#0093C8', fontSize: RFPercentage(1.5), textAlign: 'center' }}>STUDY</Text>


                            </View>



                        </View>





                    </View>



                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom:100 }}>

                        <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => { }} >


                        </TouchableOpacity>


                        <TouchableOpacity style={{ flex: .60, justifyContent: 'center' }}
                            onPress={() => { }} >


                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: .20, alignContent: 'flex-end', justifyContent: 'center' }}
                            onPress={() => {
                                this.RBSheet2.close()
                              

                            }}>

                            <Image source={require('../images/orange-arrow.png')}
                                style={styles.actionIconStyle} />


                        </TouchableOpacity>

                    </View>

                </RBSheet>



            </SafeAreaView>


        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F0F5FE',

    },
    scrollViewContainer: {
        backgroundColor: '#F0F5FE'

    },
    scrollViewInsideContainer: {
        backgroundColor: '#F0F5FE'
    },
    imgBackground: {
        height: 200,
        marginTop: 10
    },
    ImageIconStyle: {
        marginTop: 3,
        height: 25,
        width: 25,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryIconStyle: {
        height: 25,
        width: 25,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionIconStyle: {
        marginTop: 3,
        height: 50,
        width: 50,
        marginRight: 20,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
    },
    animationIconStyle: {
        marginTop: 3,
        height: 30,
        width: 30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputmultiline: {
        color: 'black',
        height: 140,
        padding: 10,
        borderWidth: 0,
        marginBottom: 10,
        textAlignVertical: 'top',
        backgroundColor: '#ffffff'
    },
    input: {
        color: 'black',
        height: 50,
        borderWidth: 0,
        fontSize: RFPercentage(2),
        textAlignVertical: 'bottom',
        backgroundColor: '#ffffff'
    },
    expertButtonStyle: {
        marginTop: 48,
        width: 300,
        height: 50,
        fontWeight: 'bold',
        borderRadius: 8,
        fontSize: RFPercentage(10),
        backgroundColor: '#dc8517',
        justifyContent: 'center',
        alignSelf: 'center',
        // Setting up View inside component align horizontally center.
        alignItems: 'center',
    },
    experttext: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    screenntitlestyle: {
        color: "#0094CD",
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    TextViewStyle:
    {
        borderWidth: 1,
        borderBottomRightRadius: 20,
        borderColor: '#0093c8',
        width: '100%',
        padding: 5,
        backgroundColor: 'transparent'

    },
    TextInputStyleClass: {

        // Setting up Hint Align center.
        textAlign: 'center',

        marginTop: 20,

        // Setting up TextInput height as 50 pixel.
        height: 50,

        // Set border width.
        borderWidth: 1,

        // Set border Hex Color Code Here.
        borderColor: '#0093c8',

        // Set border Radius.
        borderTopRightRadius: 20,

        //Set background color of Text Input.
        backgroundColor: "#F0F5FE",



    }
});

export default ServiceContractActivity1;