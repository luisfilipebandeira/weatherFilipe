import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: #000;

  padding: 24px;
  padding-top: 48px;

  align-items: center;
`

export const Title = styled.Text`
  color: #ffffff;
  font-size: 25px;
`

export const Subtitle = styled.Text`
  color: #ffffff;
  font-size: 18px;
`

export const ConditionView = styled.View`
  flex-direction: row;
`

export const TempText = styled.Text`
  color: #ffffff;
  font-size: 18px;
`

export const WeatherNextDay = styled.View`
  margin-top: 16px;
  padding: 8px;
  width: 100%;
  background-color: #d6d6d6;

  border-radius: 6px;
`

export const WeatherNextDayText = styled.Text`
  margin-left: 8px;
  color: #1a1a1a;
  font-size: 15px;
`

export const DayItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 50px;

  border-bottom-width: 1px;
  border-color: #c9c3c3;
`

export const DayText = styled.Text`
  color: #000;
  font-size: 15px;
`

export const Description = styled.Text`
  color: #000;
  font-size: 15px;
  width: 40%;
`

export const MainTemp = styled.Text`
  color: #000;
  font-size: 15px;
`

export const AlertView = styled.View`
  background-color: #d6d6d6;
  margin-top: 16px;
  border-radius: 6px;

  width: 100%;

  padding: 8px;
`

export const BoxAlert = styled.View`
`

export const Heading = styled.Text`
  color: #000;
  font-size: 26px;
  margin-left: 4px;
`

export const SenderName = styled.Text`
  color: #000;
  font-size: 18px;
  margin-top: 8px;
`

export const EventAlert = styled.Text`
  color: #9e9b93;
  font-size: 12px;
`

export const Start = styled.Text`
  color: #000;
  font-size: 12px;
`

export const End = styled.Text`
  color: #000;
  font-size: 12px;
`

export const DescriptionAlert = styled.Text`
  color: #000;
  font-size: 16px;
  margin-top: 8px;
`

export const GoBackButton = styled.TouchableOpacity`
  background-color: white;
  position: absolute;
  top: 56px;
  left: 24px;

  border-radius: 20px;
`
