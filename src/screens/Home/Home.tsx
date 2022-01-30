import React, { useEffect, useState } from 'react'

import { Ionicons } from '@expo/vector-icons'

import {
  Container,
  Heading,
  TextInputView,
  Input,
  ListCitiesSelected
} from './styles'

import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import LottieView from 'lottie-react-native'
import weatherLottie from '../../assets/weatherLottie.json'

import { CardCityWeather } from '../../components/CardCityWeather'
import { GetWeatherOneCity } from '../../services/getWeatherOneCity'
import { CityWeatherDTO } from '../../dtos/cityWeatherDTO'

import { useCity } from '../../hooks/cityContext';
import { ModalSelectCity } from '../../components/ModalSelectCity';

import { useNavigation } from '@react-navigation/native'
import { AppStackParamList } from '../../routes/app.routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type props = NativeStackNavigationProp<AppStackParamList, 'Home'>

export function Home(){
  const navigation = useNavigation<props>()

  const [isInputFocused, setIsInputFocused] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [loadingAnimation, setLoadingAnimation] = useState(false)

  const { populateContext, cities, addCityToList, getWeatherCityDetail, clearData } = useCity()
  
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

  function addCityToContext() {
    addCityToList(citySelected!)
    setIsModalVisible(false)
    setLoadingAnimation(true)
    setTimeout(() => {
      setLoadingAnimation(false)
    }, 3000)
  }

  function navigationWeatherDetail(city: CityWeatherDTO) {
    getWeatherCityDetail(city)
    navigation.navigate('WeatherDetail')
  }

  navigation.addListener('focus', () => {
    clearData()
  })

  useEffect(() => {
    async function getCitiesInfo() {
      setLoading(true)
      try {
        await populateContext()
        setLoading(false)
      } catch(err) {
        setLoading(false)
        console.log(err)
      }
    }
    
    getCitiesInfo()
  }, [])

  return (
    <Container>
      {loadingAnimation ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <LottieView
            source={weatherLottie}
            style={{ height: 200 }}
            resizeMode="contain"
            loop
            autoPlay
            speed={2}
          />
        </View>
      ) : (
        <>
          <Heading>Tempo</Heading>

          <TextInputView>
            <Ionicons name="search" size={20} color={isInputFocused ? "#fff" : "#646464"} />
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
              <ScrollView showsVerticalScrollIndicator={false}>
                {cities.length > 0 ? (
                  <>
                    {cities?.map((item) => (
                      <TouchableOpacity key={item.id} style={{marginBottom: 8}} 
                        onPress={() => navigationWeatherDetail(item)}
                      >
                        <CardCityWeather  
                          cityName={item.name} 
                          country={item.sys.country} 
                          condition={item.weather[0].description} 
                          mainTemp={item.main.temp} 
                          maxTemp={item.main.temp_max} 
                          minTemp={item.main.temp_min}   
                          icon={item.weather[0].icon}             
                        />
                      </TouchableOpacity>
                    ))}
                  </>
                ) : (
                  <Text 
                    style={{ 
                      color: '#a09d9d', 
                      textAlign: 'center', 
                      fontSize: 15,
                      marginTop: 16
                    }}
                    >Você não selecionou nenhuma cidade ainda, pesquise uma cidade para adionar ela em sua lista</Text>
                )}
              </ScrollView>
            )}
          </ListCitiesSelected>
          <ModalSelectCity 
            addCityToContext={addCityToContext}
            citySelected={citySelected!}
            isModalVisible={isModalVisible}
            onRequestClose={() => setIsModalVisible(false)}
          />
        </>
      )}
    </Container>
  )
}