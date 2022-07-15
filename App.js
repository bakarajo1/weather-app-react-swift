import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState}from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import * as Location from 'expo-location';

import DateTime from './components/DateTime'
import WeatherScroll from './components/WeatherScroll'
const API_KEY ='bf23511da98859cfbf70a44a9072cbd2';
const img = require('./assets/image.png')
export default function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        fetchDataFromApi("51.5073219", "-0.1276474","London")
        return;
      }
    

      let location = await Location.getCurrentPositionAsync({});
      fetchDataFromApi(location.coords.latitude, location.coords.longitude);
    })();
  }, [])



  const fetchDataFromApi = (latitude, longitude,name="Tbilisi") => {
    if(latitude && longitude) {
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

      // console.log(data)
      data.timezone=name
      setData(data)
      })
    }
    
  }
  const fetchTbilisi=()=>{
    fetchDataFromApi(41.6934591,44.8014495,"Tbilisi")
   


  }
  const fetchBatumi=()=>{
    fetchDataFromApi(41.6241427,41.6249897328339,"Batumi")
       


  }
  const fetchKutaisi=()=>{
    fetchDataFromApi(41.918292,45.4746493,"Kutaisi")
      


  }
  

  return (
    
    <View style={styles.container}>
      <button onClick={fetchTbilisi}>
                 Tbilisi
          </button>
      <button onClick={fetchKutaisi}>
        Kutaisi
          </button>
      <button onClick={fetchBatumi}>
        Batumi
          </button>
        
      <ImageBackground source={img} style={styles.image} >
        <DateTime current={data.current} timezone={data.timezone} lat={data.lat} lon={data.lon}/>
        <WeatherScroll weatherData={data.daily}/>
      </ImageBackground>
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image:{
    flex:1, 
    resizeMode:"cover", 
    justifyContent:"center"
  }
});
