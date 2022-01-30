import React from 'react'

import { Ionicons } from '@expo/vector-icons'

import {
  Container,
  InfoView,
  Title,
  Subtitle,
  ClimateCondition,
  Condition,
  TempInfoView,
  MainTemp,
  MaxAndMinTemp,
  MaxTemp,
  MinTemp
} from './styles'

import { View, Image } from 'react-native'

type Props = {
  cityName: string
  country: string
  condition: string
  mainTemp: number
  maxTemp: number
  minTemp: number
  icon: string
}

export function CardCityWeather({ 
    cityName, condition, country, mainTemp,
    maxTemp, minTemp, icon
  }: Props){

  const kelvinToCelsius = (kelvin: number) => {
    return (kelvin - 273.15).toFixed(2)
  }

  return (
    <Container>
      <InfoView>
        <View>
          <Title>{cityName}</Title>
          <Subtitle>{country}</Subtitle>
        </View>
        <ClimateCondition>
          <Image source={{ uri: `http://openweathermap.org/img/wn/${icon}@2x.png` }} style={{ height: 50, width: 50, marginLeft: -8 }} />
          <Condition>{condition}</Condition>
        </ClimateCondition>
      </InfoView>

      <TempInfoView>
        <MainTemp>{kelvinToCelsius(mainTemp)}°</MainTemp>
        <MaxAndMinTemp>
          <MaxTemp>Máx: {kelvinToCelsius(maxTemp)}°</MaxTemp>
          <MinTemp>Min: {kelvinToCelsius(minTemp)}°</MinTemp>
        </MaxAndMinTemp>
      </TempInfoView>
    </Container>
    )
}