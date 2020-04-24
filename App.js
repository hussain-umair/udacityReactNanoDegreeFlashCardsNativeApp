import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View,StatusBar } from 'react-native';
import DeckList from './components/DeckList'
// import {TabNavigator,StackNavigator} from 'react-navigation'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import {FontAwesome,MaterialCommunityIcons} from '@expo/vector-icons'
import {purple,white} from './utils/colors'
import AddDeck from './components/AddDeck'
import DeckView from './components/DeckView'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import decks from './reducers'
import AddCard from './components/AddCard'
import { Constants } from 'react-native-unimodules';
import Quiz from './components/Quiz'

const MyStatusBar=({backgroundColor,...props})=>{
  return(
    <View style={{backgroundColor,height:Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}
const MyTabsNavigator = createBottomTabNavigator() 

const Tabs= ()=>(
    <MyTabsNavigator.Navigator>
      <MyTabsNavigator.Screen
      name='DeckList'
      component={DeckList}
      />
      <MyTabsNavigator.Screen
      name='AddDeck'
      component={AddDeck}
      />
    </MyTabsNavigator.Navigator>
)
////////////////video code
// const Tabs = TabNavigator({
//   DeckList:{
//     screen:DeckList,
//     navigationOptions:{
//       tabBarLabel:'Decks',
//       tabBarIcon:({tintColor})=><MaterialCommunityIcons name='cards' size={30} color={tintColor}/>
//     }
//   },
//   AddDeck:{
//     screen:AddDeck,
//     navigationOptions:{
//       tabBarLabel:'Add Deck',
//       tabBarIcon:({tintColor})=><FontAwesome name='plus-square' size={30}/>
//     }
//   }
// },{
//   tabBarOptions:{
//     activeTintColor:purple,
//     style:{
//       height:56,
//       backgroundColor:white
//     }
//   }
// })


// const MainNavigator=StackNavigator({
//   Home:{
//     screen:Tabs,
//     navigationOptions:{
//       header:null
//     }
//   },
//   DeckView:{
//     screen:DeckView,
//     navigationOptions:{
//       title:'Deck Info',
//       headerTintColor:white,
//       headerStyle:{
//         backgroundColor:purple
//       }
//     }
//   },
//   AddCard:{
//     screen:AddCard,
//     navigationOptions:{
//       title:'Add Card',
//       headerTintColor:white,
//       headerStyle:{
//         backgroundColor:purple
//       }
//     }
//   },
//   Quiz:{
//     screen:Quiz,
//     navigationOptions:{
//       title:'Quiz',
//       headerTintColor:white,
//       headerStyle:{
//         backgroundColor:purple,
//       }
//     }
//   }
// })
//////////////////////end video code


const Stack = createStackNavigator();
const store=createStore(decks)
export default function App() {
  return (
    <Provider store={store}>
      <View style={{flex:1}}>
        <MyStatusBar backgroundColor={purple} barStyle='light-content'/>
        {/* <MainNavigator/> */}
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen 
            name="Tabs" 
            component={Tabs} 
            options={{title:'Deck List'}}
            />
            <Stack.Screen
            name="DeckView"
            component={DeckView}
            options={
              {
                title:"Deck View"
              }
            }
            />
            <Stack.Screen
            name="AddCard"
            component={AddCard}
            options={
              {
                title:'Add Card'
              }
            }
            />
            <Stack.Screen
            name="Quiz"
            component={Quiz}
            options={
              {
                title:'Quiz'
              }
            }
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
