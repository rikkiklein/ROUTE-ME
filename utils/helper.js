import axios from 'axios';

export default {
  getDistanceMatrix: function(){
    return axios.get('https://maps.googleapis.com/maps/api/distancematrix/json?origins=Vancouver+BC|Seattle&destinations=San+Francisco|Victoria+BC&key=AIzaSyDJSRrkIFuSWtW8xSBuZUxFVmwoxIAeSJ0')
  }
}
