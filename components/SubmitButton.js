import React from 'react'
import {TouchableOpacity,Text,View} from 'react-native'

export default function SubmitButton({onPress,style}){
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={style}>
                Submit
            </Text>
        </TouchableOpacity>
    )
}
