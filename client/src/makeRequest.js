import axios from "axios";

export const makeRequest = axios.create({
  baseURL: 'http://localhost:1337/api',
  headers: {
    Authorization: "bearer "+'9d8eeef664b00c62f4b5da55cede70df9aa94b830e13317500a11fa8de242486cf295c9839a21df620366698deb617c50d274cc3df456237023e64bc01aebed2453e67ecff5e74f04d66818b645033e77f2c63b6c4e6565a608fcadc791cfdc4a317a5977e15f0585be7cffc637684e0abbe8d50db50012d1f40b01441e15b10'
  },
});
