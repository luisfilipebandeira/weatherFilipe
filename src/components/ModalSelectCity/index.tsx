import React from 'react'

import { Modal, TouchableOpacity, Image, Text, View } from 'react-native'

import { CityWeatherDTO } from '../../dtos/cityWeatherDTO'

import { Ionicons } from '@expo/vector-icons'

import {
  Container,
  Content,
  IconView,
  TempView,
  CloseModalView
} from './styles'
import { useCity } from '../../hooks/cityContext'

type Props = {
  isModalVisible: boolean
  onRequestClose(): void
  addCityToContext(): void
  citySelected: CityWeatherDTO
}

export function ModalSelectCity({ isModalVisible, onRequestClose, addCityToContext, citySelected }: Props){
  const { selectedLang } = useCity()

  return (
    <Modal
        visible={isModalVisible}
        animationType='slide'
        onRequestClose={onRequestClose}
        transparent
      > 
      <CloseModalView onPress={onRequestClose}>
        <Ionicons name='close-circle' size={35} color="#fff" />
      </CloseModalView>
        <Container>
          <Content>
            <Text style={{ fontSize: 32, color: 'white' }}>{citySelected?.name}</Text>
            <Text style={{ fontSize: 56, color: 'white', marginTop: 8}}>{citySelected?.main.temp!}°</Text>


            <IconView>
              <Image source={{ uri: `http://openweathermap.org/img/wn/${citySelected?.weather[0].icon}@2x.png` }} style={{ height: 50, width: 50, marginLeft: -8 }} />
              <Text style={{ color: 'white', fontSize: 16 }}>{citySelected?.weather[0].description}</Text>  
            </IconView>

            <View style={{ borderTopColor: 'white', borderWidth: 1, width: '100%', marginTop: 16 }} />

            <TempView style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 16 }}>
              <Text style={{ color: 'white', fontSize: 16 }}>Máx: {citySelected?.main.temp_max!}°</Text>
              <Text style={{ color: 'white', fontSize: 16 }}>Min: {citySelected?.main.temp_min!}°</Text>
            </TempView>

            <TouchableOpacity 
              onPress={addCityToContext}
              style={{ height: 56, backgroundColor: '#03790d', width: '100%', borderRadius: 6, alignItems: 'center', justifyContent: 'center', marginTop: 32 }}>
              <Text style={{ color: 'white', fontSize: 16 }}>{selectedLang === 'pt_br' ? 'Adicionar cidade na sua lista' : 'Add city in your list'}</Text>
            </TouchableOpacity>
          </Content>
        </Container>
      </Modal>
  )
}