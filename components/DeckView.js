import React from 'react'
import {StyleSheet,Text,View} from 'react-native'
import {getData} from '../utils/api'
import {connect} from 'react-redux'
import ActionButton from './ActionButton'
import { white, purple, red, orange } from '../utils/colors'


class DeckView extends React.Component{

    render(){
        const deck = this.props.navigation.state.params.entryId
        const {decks} = this.props
        return(
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.mainText}>{decks[deck].title}</Text>
                    <Text style={styles.subText}>{decks[deck].questions.length}</Text>

                    <ActionButton 
                    styles={styles} 
                    text={'Add Card'} 
                    onPress={()=>this.props.navigation.navigate('AddCard',{entryId:deck})}
                    color={purple}
                    />
                    <ActionButton 
                    styles={styles}
                    text={'Start Quiz'}
                    color={red}
                    onPress={()=>this.props.navigation.navigate('Quiz',{entryID:deck})}
                    />
                </View>
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:white,
        padding:10,
    },
    iosBtn:{
        padding:10,
        borderRadius:7,
        height:45,
        margin:5,
        width:170
    },
    submitBtnText:{
        color:white,
        fontSize:22,
        textAlign:'center'
    },
    card:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:10,
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
    }
})

function mapStateToProps({decks}){
    return {
        decks
    }
}
export default connect(mapStateToProps)(DeckView)