export interface CityWeatherWeekDTO {
  lat: number,
  lon: number,
  timezone: string
  timezone_offset: number
  daily: [
    {
      dt: number
      sunrise: number
      sunset: number
      moonrise: number
      moonset: number
      moon_phase: number
      temp: {
        day: number
        min: number
        max: number
        night: number
        eve: number
        morn: number
      },
      weather: [
        {
          id: number
          main: string
          description: string
          icon: string
        }
      ],
    }
  ]
  alerts?: [
    {
      sender_name: string
      event: string
      start: number
      end: number
      description: string
    }
  ]
}