import React, { useEffect, useState } from 'react'

import { Ionicons } from '@expo/vector-icons'

import {
  Container,
  Heading,
  TextInputView,
  Input,
  ListCitiesSelected
} from './styles'

import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View, Image } from 'react-native'
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

  const { populateContext, cities, addCityToList, getWeatherCityDetail, clearData, selectedLang, setSelectedLang } = useCity()
  
  const [citySelected, setCitySelected] = useState<CityWeatherDTO>()
  const [cityInput, setCityInput] = useState('')

  const [loading, setLoading] = useState(false)

  async function searchNewCity() {
    try {
      const response = await GetWeatherOneCity({city: cityInput, lang: selectedLang, units: selectedLang === 'pt_br' ? 'metric' : 'imperial'})
      setCitySelected(response)
      setIsModalVisible(true)
    } catch (err){
      console.log({err})
    }
  }

  async function addCityToContext() {
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
  }, [selectedLang])

  return (
    <Container>
      {loadingAnimation ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <LottieView
            source={weatherLottie}
            style={{ height: 200 }}
            resizeMode="contain"
            loop
            autoPlay={true}
            speed={2}
          />
        </View>
      ) : (
        <>
          <TouchableOpacity 
            onPress={() => setSelectedLang(selectedLang === 'en' ? 'pt_br' : 'en')}
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Heading>{selectedLang === 'pt_br' ? 'Clima' : 'Weather'}</Heading>
            <Image source={{ uri: selectedLang === 'pt_br' ? 'https://ppgpsi-ufscar.com.br/media/mod_falang/images/pt_br.gif' : 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/255px-Flag_of_the_United_Kingdom_%283-5%29.svg.png' }} 
              style={{ height: 30, width: 30, borderRadius: 15 }}
            />
          </TouchableOpacity>

          <TextInputView>
            <Ionicons name="search" size={20} color={isInputFocused ? "#fff" : "#646464"} />
            <Input 
              placeholder={selectedLang === 'pt_br' ? 'Busque uma cidade' : 'Search for a city' }
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
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 100}}>
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