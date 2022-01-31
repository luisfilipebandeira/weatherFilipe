import React from 'react'

import { Text, Image, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'

import { useCity } from '../../hooks/cityContext'

import { Ionicons } from '@expo/vector-icons'

import {
  Container,
  Title,
  Subtitle,
  ConditionView,
  TempText,
  WeatherNextDay,
  WeatherNextDayText,
  DayItem,
  DayText,
  Description,
  MainTemp,
  AlertView,
  BoxAlert,
  Heading,
  SenderName,
  EventAlert,
  Start,
  End,
  DescriptionAlert,
  GoBackButton
} from './styles'

import { format } from 'date-fns'

import { useNavigation } from '@react-navigation/native'
import { AppStackParamList } from '../../routes/app.routes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type props = NativeStackNavigationProp<AppStackParamList, 'WeatherDetail'>

export function WeatherDetail(){
  const navigation = useNavigation<props>()

  const { currentCityWeekWeather, currentCity, removeCityFromList,
  populateContext, selectedLang } = useCity()

  function removeFromList() {
    removeCityFromList(currentCity!)
    populateContext()
    navigation.goBack()
  }

  if(!currentCityWeekWeather || !currentCity) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
        <ActivityIndicator size="large" color="white" />
      </View>
    )
  }

  return (
    <ScrollView style={{ backgroundColor: '#000' }}>
      <Container>
        <GoBackButton onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} color="black" />
        </GoBackButton>

        <Title>{currentCity?.name}</Title>
        <ConditionView>
          <TempText>{currentCity?.main.temp}° | </TempText>
          <Subtitle>{currentCity?.weather[0].description}</Subtitle>
        </ConditionView>

        <WeatherNextDay>
          <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomColor: '#333', borderBottomWidth: 1, height: 32 }}>
            <Ionicons name="calendar" size={20} color="#000" />
            <WeatherNextDayText>Previsão para os próximos dias</WeatherNextDayText>
          </View>

          {currentCityWeekWeather?.daily.map((item) => (
            <DayItem key={item.dt}>
              <DayText>{format(new Date(item.dt * 1000), 'dd/MM')}</DayText>
              <Image source={{ uri:`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` }} style={{ height: 40, width: 40 }} />
              <Description>{item.weather[0].description}</Description>
              <MainTemp>{item.temp.day}°</MainTemp>
            </DayItem>
          ))}
        </WeatherNextDay>

        <AlertView>
          {currentCityWeekWeather?.alerts !== undefined ? (
            <>
              <BoxAlert>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name='warning' size={35} color="#ff1515" />
                  <Heading>{selectedLang === 'pt_br' ? 'Alertas' : 'Alerts'}</Heading>
                </View>

                {currentCityWeekWeather?.alerts!.map((item, index) => (
                  <View key={index}>
                    <SenderName>{item.sender_name}</SenderName>
                    <EventAlert>{item.event}</EventAlert>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
                      <Start>Inicio: {format(new Date(item.start * 1000), 'dd/MM')}</Start>
                      <End>Termina em: {format(new Date(item.end * 1000), 'dd/MM')}</End>
                    </View>
                    <DescriptionAlert>{item.description}</DescriptionAlert>
                  </View>
                ))}
              </BoxAlert>
            </>
          ) : (
            <Text>{selectedLang === 'pt_br' ? 'Esta cidade não possui nenhum alerta' : 'This city has no alert'}</Text>
          )}
        </AlertView>

        <TouchableOpacity 
          onPress={removeFromList}
          style={{ height: 56, backgroundColor: '#b60909', width: '100%', borderRadius: 6, alignItems: 'center', justifyContent: 'center', marginTop: 32 }}>
          <Text style={{ color: 'white', fontSize: 16 }} >{selectedLang === 'pt_br' ? 'Remover cidade da sua lista' : 'Remove city from your list'}</Text>
        </TouchableOpacity>
      </Container>
    </ScrollView>
  )
}