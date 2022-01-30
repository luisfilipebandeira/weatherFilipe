import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: #000;
  padding: 16px;
`

export const Content = styled.View`
  margin-top: 64px;
  align-items: center;
`

export const IconView = styled.View`
  flex-direction: row;
  align-items: center;
`

export const TempView = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin-top: 16px;
`

export const CloseModalView = styled.TouchableOpacity`
  position: absolute;
  right: 16px;
  top: 42px;

  z-index: 1;
`