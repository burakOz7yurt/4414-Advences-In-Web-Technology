import axios from 'axios';

const API_URL = 'http://localhost:80/api/test/';

class UserService {
  getKur(){
    return axios.get(API_URL + 'kur');
  }
  getAllTradesmen() {
    return axios.get(API_URL + 'alltradesmen');
  }
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }
  getAllAdverts() {
    return axios.get(API_URL + 'allreks');
  }
  getTradesmenById(id) {
    return axios.get(API_URL + 'tradesmens/'+id);
  }

  getAdvertById(id) {
    return axios.get(API_URL + 'rek/'+id);
  }

  getAdvertsByTradesmenId(id) {
    return axios.get(API_URL + 'rektradesmenid/'+id);
  }

  getAdvertsByCategoryContain(contain) {
    return axios.get(API_URL + 'allrekscontain/' + contain);
  }

  getUsersByCategoryContain(contain) {
    return axios.get(API_URL + 'alluserscontain/' + contain);
  }

  getAddressByTradesmenId(id) {
    return axios.get(API_URL + 'address/'+id);
  }

}

export default new UserService();
