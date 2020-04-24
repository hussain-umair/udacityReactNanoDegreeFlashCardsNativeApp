import React from 'react'
import {StyleSheet,View,Text,Button,TextInput} from 'react-native'
import {saveDeckTitle} from '../utils/api'
import {addDeck} from '../actions'
import {connect} from 'react-redux'
import SubmitButton from './SubmitButton'
import { orange } from '../utils/colors'
class AddDeck extends React.Component{

    state={
        text:''
    }
    submitName=()=>{
        const {text} = this.state
        saveDeckTitle(text)
        this.props.dispatch(addDeck(text))
        this.props.navigation.navigate('DeckView',{entryId:text})
        this.setState({text:''})
    }
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.title}>New Deck Title?</Text>
                <TextInput
                style={styles.input} 
                onChangeText={(text) =>this.setState({text:text})}
                value={this.state.text}
                >
                </TextInput>
                <SubmitButton onPress={this.submitName} style={styles.submitBtn}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    input:{
        width:200,
        height:44,
        padding:8,
        borderWidth:1,
        borderColor:'#757575',
        margin:50,
        borderRadius:8
    },
    title:{
        fontSize:30,
        color:'#333',
        textAlign:'center'
    },
    submitBtn:{
        borderWidth:0.5,
        borderColor:'#d6d7da',
        padding:10,
        borderRadius:7,
        overflow:'hidden',
        backgroundColor:orange
    }
})

export default connect()(AddDeck)