import axios from "axios";

const API_URL = "http://localhost:80/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password, telNo, category) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      telNo,
      category
    });
  }
  addAdvert(tradesmenId, advertName, advertCategory, advertDesc) {
    return axios.post(API_URL + "ekrek", {
        tradesmenId,
        advertName,
        advertCategory,
        advertDesc
    });
  }

  updateAdvert(id,tradesmenId, advertName, advertCategory, advertDesc) {
    return axios.put(API_URL + "updaterek/" + id , {
        tradesmenId,
        advertName,
        advertCategory,
        advertDesc
    });
  }

  deleteAdvert(id){
    return axios.delete(API_URL + 'deleterek/' + id);
  }
  addAddress(tradesmenId, province, district, neighborhood, street, doorNo) {
    return axios.post(API_URL + "adresek", {
        tradesmenId,
        province,
        district,
        neighborhood,
        street,
        doorNo
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
