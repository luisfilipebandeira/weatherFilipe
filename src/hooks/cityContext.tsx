import React, { createContext, ReactNode, useContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CityWeatherDTO } from '../dtos/cityWeatherDTO'
import produce from 'immer';
import { GetWeatherOneCity } from '../services/getWeatherOneCity';

interface CityContextData {
  cities: CityWeatherDTO[]
  addCityToList(newCityInfo: CityWeatherDTO): void
  populateContext(): void
}

interface ProviderProps {
  children: ReactNode
}

const CityContext = createContext<CityContextData>({} as CityContextData)

export const CityProvider = ({children}: ProviderProps) => {
  const [cities, setCities] = useState<CityWeatherDTO[]>([])
  const [listOfCities, setListOfCities] = useState([])

  async function populateContext() {
    setListOfCities([])
    setCities([])
    const cityStored = await AsyncStorage.getItem('@cityWeather');
    const arrayCity = JSON.parse(cityStored!)
    for(let i = 0; i <= arrayCity?.length - 1; i++){
      const response = await GetWeatherOneCity({city: arrayCity[i]!})
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
    console.log(newCityInfo.name)
    if(newCityInfo !== null) {
      await AsyncStorage.setItem('@cityWeather', JSON.stringify([...listOfCities, newCityInfo.name]))
      setCities(
        produce((draft) => {
          draft.push(newCityInfo)
      }))
    }
  }

  return (
    <CityContext.Provider 
      value={{
        cities,
        addCityToList,
        populateContext
      }}
    >
      {children}
    </CityContext.Provider>
  )
}

export const useCity = () => useContext(CityContext)