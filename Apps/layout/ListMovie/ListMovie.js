/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import SearchBar from 'react-native-search-bar';
import Button from '../../components/Button/Button';
import {images} from '../../config/images';
import {colors} from '../../config/appstyles';
import {capitalizeFirst} from '../../lib/string';
import {capitalizeAll} from '../../lib/string';
import styles from './styles';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  TouchableOpacity,
  TextInput

} from 'react-native';

export default class ListMovie extends Component {
  constructor(props){
    super(props);
    this.state={
      dataSource: new ListView.DataSource({
        rowHasChanged:(r1, r2) => r1!==r2
      }),
    data:'',
    text:''
    }
  }
/*this function will call first */
componentDidMount(){
    this.getMoviesFromApiAsync()
  }


 getMoviesFromApiAsync() {
      return fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({isLoading: false, jsonData: responseJson});
          console.log(responseJson);
           console.log("Update data source: "+ this.state.dataSource.getRowCount());
           this.setState({ 
            dataSource: this.state.dataSource.cloneWithRows(responseJson.results)
           });
           data = responseJson.results;
           console.log("Update data source: "+ this.state.dataSource.getRowCount());
          return responseJson;
        })
        .catch((error) => {
          console.error(error);
        });
    }

filterSearch(text){
  console.log(text);
  const newData = data.filter(function(item){
            const itemData = item.title.toUpperCase()
            const textData = text.toUpperCase()
            return itemData.indexOf(textData) > -1
        })
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(newData),
            text: text
        })
}


renderRow(property){
  return(
    <TouchableOpacity onPress={()=>{alert(property.title+" : ID ="+ property.id)}}>
      <View style={styles.containerItem}>
        <View style ={styles.viewBanner}>
          <Image style={styles.photoBanner} source={{uri:'https://image.tmdb.org/t/p/original'+property.poster_path}} />
       </View>

      <View style = {styles.viewInfor}>
        <Text style = {styles.title}>{property.title}</Text>
        <Text
        numberOfLines ={3} 
        style = {styles.description}>
          {property.overview}
        </Text>
      </View>
  </View>
   </TouchableOpacity>
  )
}

  render() {
    if(this.state.dataSource.getRowCount() === 0 ){
      var rows = <View><Text style ={styles.description}>Loading...</Text></View>
    }else {
      var rows = 
       <ListView
        style = {styles.listView}
        dataSource = {this.state.dataSource}
        renderRow  = {this.renderRow}
      />
    }

    return (
   <View style={styles.container}>
      <View style = {styles.boderView}>
       <TextInput
       style = {styles.searchView}
       placeholder ='Search'
       value = {this.state.text}
      onChangeText={(text)=>this.filterSearch(text)}
       placeholderTextColor ={colors.secondary_text_color}
      />  
      </View>
         {rows}
        </View>
            
    );
  }
}