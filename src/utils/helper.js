import axios from 'axios';

export default {
  getDistanceMatrix: function(data){
    return axios.post('https://shielded-beyond-13922.herokuapp.com/distance', data)

  },
  getDirections: function(data){
    return axios.post("https://shielded-beyond-13922.herokuapp.com/directions", data)
  },
  getAllRoutes: function(){
    return axios.get('https://shielded-beyond-13922.herokuapp.com/saved-routes')
  },
  saveRoutes: function(data){
    return axios.post('https://shielded-beyond-13922.herokuapp.com/saved-routes/new', data)
  },
  deleteRoute: function(name){
    return axios.delete('https://shielded-beyond-13922.herokuapp.com/saved-routes/' + name)
  }

}
