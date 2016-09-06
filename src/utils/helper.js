import axios from 'axios';

export default {
  getDistanceMatrix: function(data){
    return axios.post('https://gentle-waters-71149.herokuapp.com/distance', data)

  },
  getDirections: function(data){
    return axios.post("https://gentle-waters-71149.herokuapp.com/directions", data)
  },
  getAllRoutes: function(){
    return axios.get('https://gentle-waters-71149.herokuapp.com/saved-routes')
  },
  saveRoutes: function(data){
    return axios.post('https://gentle-waters-71149.herokuapp.com/saved-routes/new', data)
  },
  deleteRoute: function(name){
    return axios.delete('https://gentle-waters-71149.herokuapp.com/saved-routes/' + name)
  }

}
