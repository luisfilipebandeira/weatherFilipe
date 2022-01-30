import axios, { AxiosResponse } from 'axios'
import { CityWeatherWeekDTO } from '../dtos/cityWeatherWeekDTO'

type Request = {
  lat: number
  lon: number
}

export const GetWeatherWeek = async (params: Request) => {
  const { data }: AxiosResponse<CityWeatherWeekDTO> = await axios.post(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${params.lat}&lon=${params.lon}&exclude=current,minutely,hourly&appid=924b62244a067a6f096f4611a7f668aa&units=metric&lang=pt_br`
  )
  return data
}