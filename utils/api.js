import {AsyncStorage} from 'react-native'


const FLASHCARDS_STORAGE_KEY='flashcards:decks'
const initialData={
    Geography:{
        title:'Geography',
        questions:[
            {
                question:'Is SouthAfrica a country?',
                answer:'No, it is a region!',
                correctAnswer:"false"
            },
            {
                question:'Is Sindh a country?',
                answer:'No, it is a Province!',
                correctAnswer:"false"
            }
        ]
    },
    JavaScript:{
        title:'JavaScript',
        questions:[
            {
                question:'What is a closure?',
                answer:'The combination of functions and a lexical enviroment within which those functions were declared!',
                correctAnswer:'true'
            },
            {
                question:'What is a variable?',
                answer:'something that stores infromation!',
                correctAnswer:'true'
            }
        ]
    }
}

export const getData=()=>{
    return initialData
}
export const getDecks=(decks)=>{
    
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(results=>{
        if(results===null){
            AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY,JSON.stringify(initialData))
            return initialData
        }
        else{
            return results
        }
    })
}

export function saveDeckTitle(title){
    return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY,JSON.stringify({
        [title]:{
            title:title,
            questions:[]
        }
    }))
}
export function addCardToDeck(name,card){
    return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(results=>JSON.parse(results))
    .then(results=>{
        results[name].questions.push(card)
        AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY,JSON.stringify(results))
        return results
    })
}
export function remove(){
    return AsyncStorage.removeItem(FLASHCARDS_STORAGE_KEY)
}