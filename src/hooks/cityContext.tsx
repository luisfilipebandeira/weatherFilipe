import React, { createContext, ReactNode, useContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import produce from 'immer';

import { CityWeatherDTO } from '../dtos/cityWeatherDTO'
import { GetWeatherOneCity } from '../services/getWeatherOneCity';
import { GetWeatherWeek } from '../services/getWeatherWeek';
import { CityWeatherWeekDTO } from '../dtos/cityWeatherWeekDTO';

interface CityContextData {
  cities: CityWeatherDTO[]
  addCityToList(newCityInfo: CityWeatherDTO): void
  populateContext(): void
  currentCityWeekWeather: CityWeatherWeekDTO | undefined
  getWeatherCityDetail(item: CityWeatherDTO): void
  currentCity: CityWeatherDTO | undefined,
  removeCityFromList(cityInfo: CityWeatherDTO): void
  clearData(): void
  setSelectedLang(value: 'pt_br' | 'en'): void
  selectedLang: ('pt_br' | 'en')
}

interface ProviderProps {
  children: ReactNode
}

const CityContext = createContext<CityContextData>({} as CityContextData)

export const CityProvider = ({children}: ProviderProps) => {
  const [cities, setCities] = useState<CityWeatherDTO[]>([])
  const [listOfCities, setListOfCities] = useState([])

  const [selectedLang, setSelectedLang] = useState<'pt_br' | 'en'>('pt_br')
  
  const [currentCityWeekWeather, setCurrentCityWeekWeather] = useState<CityWeatherWeekDTO | undefined>()
  const [currentCity, setCurrentCity] = useState<CityWeatherDTO>()

  async function populateContext() {
    setListOfCities([])
    setCities([])
    const cityStored = await AsyncStorage.getItem('@cityWeather');
    const arrayCity = JSON.parse(cityStored!)
    for(let i = 0; i <= arrayCity?.length - 1; i++){
      const response = await GetWeatherOneCity({city: arrayCity[i]!, lang: selectedLang, units: selectedLang === 'pt_br' ? 'metric' : 'imperial'})
      setListOfCities(
        produce((draft: string[]) => {
          draft.push(response.name)
      }))
      setCities(
        produce((draft) => {
          draft.push(response)
        })
      )
    }

  }

  async function addCityToList(newCityInfo: CityWeatherDTO) {
    if(newCityInfo !== null) {
      await AsyncStorage.setItem('@cityWeather', JSON.stringify([...listOfCities, newCityInfo.name]))
      setCities(
        produce((draft) => {
          draft.push(newCityInfo)
      }))
    }
  }

  async function removeCityFromList(cityInfo: CityWeatherDTO) {
    if(cityInfo !== null) {
      const newList = listOfCities.filter((item) => item !== cityInfo.name)
      setCities(newList)
      await AsyncStorage.setItem('@cityWeather', JSON.stringify(newList))
    }
  }

  async function getWeatherCityDetail(item: CityWeatherDTO) {
    const response = await GetWeatherWeek({lat: item.coord.lat, lon: item.coord.lon, lang: selectedLang, units: selectedLang === 'pt_br' ? 'metric' : 'imperial'})
    setCurrentCityWeekWeather(response)
    setCurrentCity(item)
  }

  function clearData() {
    setCurrentCityWeekWeather(undefined)
    setCurrentCity(undefined)
  }

  return (
    <CityContext.Provider 
      value={{
        cities,
        addCityToList,
        populateContext,
        currentCityWeekWeather,
        getWeatherCityDetail,
        currentCity,
        removeCityFromList,
        clearData,
        selectedLang,
        setSelectedLang
      }}
    >
      {children}
    </CityContext.Provider>
  )
}

export const useCity = () => useContext(CityContext)