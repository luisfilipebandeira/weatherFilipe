import styled from 'styled-components/native'

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;

  background-color: #3347f5;

  padding: 8px;
  height: 105px;
  border-radius: 6px;
`

export const InfoView = styled.View`
  justify-content: space-between;
`

export const Title = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`

export const Subtitle = styled.Text`
  color: #fff;
  font-size: 13px;
`

export const ClimateCondition = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Condition = styled.Text`
  color: #fff;
  font-size: 13px;
  margin-left: -4px;
`

export const TempInfoView = styled.View`
  justify-content: space-between;
  align-items: center;
`

export const MainTemp = styled.Text`
  color: #fff;
  font-size: 30px;

  justify-content: center;
`

export const MaxAndMinTemp = styled.View`
`

export const MaxTemp = styled.Text`
  color: #fff;
  font-size: 10px;
`

export const MinTemp = styled.Text`
  color: #fff;
  font-size: 10px;
`

