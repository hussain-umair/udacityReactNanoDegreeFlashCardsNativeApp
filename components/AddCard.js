import React from 'react'
import {Text, View,StyleSheet,TouchableOpacity,TextInput,KeyboardAvoidingView} from 'react-native'
import {NavigationActions} from 'react-navigation'
import {purple,orange,white,} from '../utils/colors'
import {addCardToDeck} from '../utils/api'
import {connect} from 'react-redux'
import {addCard} from '../actions'
import SubmitButton from './SubmitButton'

class AddCard extends React.Component{

    state={
        question:'',
        answer:'',
        correctAnswer:''
    }
    submitCard=(deck)=>{
        const {question,answer,correctAnswer} = this.state
        this.props.dispatch(addCard({question,answer,correctAnswer,deck}))
        addCardToDeck(deck,{question,answer,correctAnswer})
        this.setState({question:'',answer:'',correctAnswer:''})
        // this.props.navigation.dispatch(NavigationActions.back(null))
        this.props.navigation.goBack()
    }
    render(){
        const deckName = this.props.route.params.entryId
        return(
            
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.container}>
                    <Text style={styles.title}>
                        What is the question?
                    </Text>
                    <TextInput 
                    style={styles.input}
                    onChangeText={(question)=>this.setState({question})}
                    value={this.state.question}
                    >

                    </TextInput>
                    <Text style={styles.title}>
                        Answer to show!
                    </Text>
                    <TextInput
                    style={styles.input}
                    onChangeText={(answer)=>this.setState({answer})}
                    value={this.state.answer}
                    >
                        
                    </TextInput>
                    <Text style={styles.title}>
                        true or false only
                    </Text>
                    <TextInput
                    style={styles.input}
                    onChangeText={(correctAnswer)=>this.setState({correctAnswer})}
                    value={this.state.correctAnswer}
                    >
                        
                    </TextInput>
                    <SubmitButton onPress={()=>this.submitCard(deckName)} style={styles.submitBtn}/>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    submitBtnText:{
        color:white,
        fontSize:22,
        textAlign:'center'
    },
    title:{
        fontSize:30,
        color:'#333',
    },
    submitBtn:{
        borderWidth:0.5,
        borderColor:'#d6d7da',
        padding:10,
        backgroundColor:orange,
        borderRadius:7,
        overflow:'hidden'
    },
    input:{
        width:250,
        height:40,
        padding:8,
        borderWidth:1,
        borderColor:'#757575',
        margin:20,
        borderRadius:7
    }
})
export default connect()(AddCard)