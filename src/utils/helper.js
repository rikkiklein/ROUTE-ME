import axios from 'axios';

export default {
  getDistanceMatrix: function(data){
    return axios.post('http://localhost:3000/distance', data)
  }
}
