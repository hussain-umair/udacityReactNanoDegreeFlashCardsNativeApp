import React from 'react'
import {StyleSheet,TouchableOpacity,KeyboardAvoidingView,View,Text} from 'react-native'
import {NavigationActions} from 'react-navigation'
import {orange,white,purple,red,green} from '../utils/colors'
import SubmitButton from './SubmitButton'
import {connect} from 'react-redux'
import ActionButton from './ActionButton'
import Info from './Info'
import {remove} from '../utils/api'

class Quiz extends React.Component{

    state={
        questionNumber:0,
        showQuestion:false,
        correct:0,
        incorrect:0
    }
    showAnswer=()=>{
        this.setState({showQuestion:!this.state.showQuestion})
    }
    submitAnswer=(answer)=>{
        const {questionNumber} = this.state
        const deck = this.props.route.params.entryId
        const decks = this.props.decks
        const correct = decks[deck].questions[questionNumber].correctAnswer.toLowerCase()

        console.log('correct: ',typeof correct)
        console.log('answer: ',typeof answer)
        if(answer === correct){
            console.log('correct answer')
            this.setState((prevState)=>({...prevState,correct:prevState.correct + 1}))
        }
        else{
            console.log('incorrectAnswer')
            this.setState((prevState)=>({...prevState,incorrect:prevState.incorrect + 1}))
        }
        this.setState((prevState)=>({questionNumber: prevState.questionNumber +1,showQuestion:false }))
    }
    render(){
        const {questionNumber} = this.state
        const {decks} = this.props
        const deck = this.props.route.params.entryId
        const number = this.state.questionNumber+1
        
        if(questionNumber === decks[deck].questions.length){
            return(
                <View style={styles.container}>
                    <View style={styles.card}>
                        <Text style={styles.mainText}>You got {this.state.correct} out of {decks[deck].questions.length}!</Text>
                        {this.state.correct>this.state.incorrect?
                        <Text style={{fontSize:90}}>Smily!</Text>:
                        <Text style={{fontSize:90}}>Crying!</Text>}
                        <ActionButton styles={styles} text='try again' color={red}/>
                        <ActionButton styles={styles} text='back' color={green}/>
                    </View>
                </View>
            )
        }
        return(
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.question}>{number} / {decks[deck].questions.length}</Text>
                    {
                    !this.state.showQuestion?
                    <Text style={styles.mainText}>{decks[deck].questions[questionNumber].question}</Text>:
                    <Text style={styles.mainText}>{decks[deck].questions[questionNumber].answer}</Text>
                    }
                    {
                        !this.state.showQuestion?
                        <Info text='Show Answer' style={styles.answer} onPress={()=>this.setState({showQuestion:!this.state.showQuestion})}/>:
                        <Info text='Show Question' style={styles.answer} onPress={()=>this.setState({showQuestion:!this.state.showQuestion})}/>
                    }
                    <ActionButton styles={styles}text='Correct' color={green} onPress={()=>this.submitAnswer("true")}/>
                    <ActionButton styles={styles}text='Incorrect' color={red} onPress={()=>this.submitAnswer("false")}/>
                    {/* <ActionButton styles={styles}text='Correct' color={green} onPress={()=>remove()}/> */}
                    
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    iosBtn:{
        padding:10,
        borderRadius:7,
        height:45,
        margin:5,
        width:160
    },
    card:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        margin:10,
        backgroundColor:orange,
        alignSelf:'stretch',
        borderRadius:10,
        shadowColor:'rgba(0,0,0,0.34)',
        shadowOffset:{
            width:0,
            height:3
        },
        shadowRadius:4,
        shadowOpacity:1
    },
    answer:{
        color:white,
        fontSize:20,
        margin:20
    },
    questions:{
        top:0,
        alignSelf:'flex-start',
        left:0,
        color:white,
        fontSize:20,
        margin:5,
        position:'absolute'
    },
    mainText:{
        fontSize:40,
        color:white,
        marginTop:40,
        textAlign:'center'
    },
    submitBtnText:{
        color:white,
        fontSize:26,
        textAlign:'center'
    }
})
function mapStateToProps(decks){
    return{
        decks
    }
}
export default connect(mapStateToProps)(Quiz)
