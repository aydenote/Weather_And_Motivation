import axios from 'axios';
export function getForecast() {
  const endPointUrl = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';
  return axios({
    url: `${endPointUrl}?ServiceKey=${process.env.NEXT_PUBLIC_WEATHER_API}&numOfRows=10&pageNo=1&dataType=JSON&base_date=20230414&base_time=1400&nx=55&ny=127`,
    method: 'get',
  });
}
