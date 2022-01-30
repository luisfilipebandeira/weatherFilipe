import React, { useEffect, useState } from 'react'

import { Ionicons } from '@expo/vector-icons'

import {
  Container,
  Heading,
  TextInputView,
  Input,
  ListCitiesSelected
} from './styles'

import { ActivityIndicator, Image, Modal, Text, TouchableOpacity, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { CardCityWeather } from '../../components/CardCityWeather'
import { GetWeatherOneCity } from '../../services/getWeatherOneCity'
import { CityWeatherDTO } from '../../dtos/cityWeatherDTO'
import { kelvinToCelsius } from '../../utils/KelvinToCelsius';
import produce from 'immer';

export function Home(){
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  
  const [cities, setCities] = useState<CityWeatherDTO[]>([])
  const [listOfCities, setListOfCities] = useState([])
  const [citySelected, setCitySelected] = useState<CityWeatherDTO>()
  const [cityInput, setCityInput] = useState('')

  const [loading, setLoading] = useState(false)

  async function searchNewCity() {
    try {
      const response = await GetWeatherOneCity({city: cityInput})
      setCitySelected(response)
      setIsModalVisible(true)
    } catch (err){
      console.log({err})
    }
  }

  async function addCityToList() {
    if(cityInput !== null) {
      await AsyncStorage.setItem('@cityWeather', JSON.stringify([...listOfCities, cityInput]))
    }
    setIsModalVisible(false)
  }

  useEffect(() => {
    async function getCitiesInfo() {
      setLoading(true)
      const cityStored = await AsyncStorage.getItem('@cityWeather');
      const arrayCity = JSON.parse(cityStored)
      for(let i = 0; i <= arrayCity?.length; i++){
        try {
          const response = await GetWeatherOneCity({city: arrayCity[i]!})
          setListOfCities(
            produce((draft) => {
              draft.push(response.name)
          }))
          setCities(
            produce((draft) => {
              draft.push(response)
            })
          )
        } catch (err){
          setLoading(false)
          console.log({err})
        }
      }
      setLoading(false)
    }

    getCitiesInfo()
  }, [])

  return (
    <Container>
      <Heading>Tempo</Heading>

      <TextInputView>
        <Ionicons name="search" size={20} color={isInputFocused ? "#fff" : "#646464"} />
        {/* <GooglePlacesAutocomplete 
          placeholder='Busque uma cidade'
          nearbyPlacesAPI='GooglePlacesSearch'
          debounce={400}
          onPress={(data, details = null) => {
            console.log(data, details);
          }}
          query={{
            key: 'AIzaSyCqQmXpFf5483a0vfO64qQzI9ZlofCKPc8',
            language: 'en',
          }}
        /> */}
        <Input 
          placeholder='Busque uma cidade' 
          placeholderTextColor="#646464"
          selectionColor="#fff"
          onSubmitEditing={searchNewCity}
          onChangeText={setCityInput}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
      </TextInputView>

      <ListCitiesSelected>
        {loading ? (
          <View>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : (
          <>
            {cities.map((item) => (
              <View key={item.id} style={{marginBottom: 8}}>
                <CardCityWeather  
                  cityName={item.name} 
                  country={item.sys.country} 
                  condition={item.weather[0].main} 
                  mainTemp={item.main.temp} 
                  maxTemp={item.main.temp_max} 
                  minTemp={item.main.temp_min}   
                  icon={item.weather[0].icon}             
                />
              </View>
            ))}
          </>
        )}
      </ListCitiesSelected>
      <Modal
        visible={isModalVisible}
        animationType='slide'
        onRequestClose={() => setIsModalVisible(false)}
        transparent
      > 
        <View style={{ flex: 1, backgroundColor: '#000000', padding: 16 }}>
          <View style={{ alignItems: 'center', marginTop: 24 }}>
            <Text style={{ fontSize: 32, color: 'white' }}>{citySelected?.name}</Text>
            <Text style={{ fontSize: 56, color: 'white', marginTop: 8}}>{kelvinToCelsius(citySelected?.main.temp!)}°</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={{ uri: `http://openweathermap.org/img/wn/${citySelected?.weather[0].icon}@2x.png` }} style={{ height: 50, width: 50, marginLeft: -8 }} />
              <Text style={{ color: 'white', fontSize: 16 }}>{citySelected?.weather[0].main}</Text>  
            </View>

            <View style={{ borderTopColor: 'white', borderWidth: 1, width: '100%', marginTop: 16 }} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 16 }}>
              <Text style={{ color: 'white', fontSize: 16 }}>Máx: {kelvinToCelsius(citySelected?.main.temp_max!)}°</Text>
              <Text style={{ color: 'white', fontSize: 16 }}>Min: {kelvinToCelsius(citySelected?.main.temp_min!)}°</Text>
            </View>

            <TouchableOpacity 
              onPress={addCityToList}
              style={{ height: 56, backgroundColor: '#03790d', width: '100%', borderRadius: 6, alignItems: 'center', justifyContent: 'center', marginTop: 32 }}>
              <Text style={{ color: 'white', fontSize: 16 }} >Adicionar cidade na sua lista</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Container>
  )
}