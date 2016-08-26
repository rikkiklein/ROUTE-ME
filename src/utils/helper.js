import axios from 'axios';

export default {
  getDistanceMatrix: function(){
    return axios.get('http://localhost:3000/distance')
  }
}
