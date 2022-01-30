import axios, { AxiosResponse } from 'axios'
import { CityWeatherDTO } from '../dtos/cityWeatherDTO'

type Request = {
  city: string
}

export const GetWeatherOneCity = async (params: Request) => {
  const { data }: AxiosResponse<CityWeatherDTO> = await axios.post(
    `https://api.openweathermap.org/data/2.5/weather?q=${params.city}&appid=da50a28a47e8cb32f9bd1842b26dacee&lang=pt_br&units=metric`
  )
  return data
}