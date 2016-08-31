import React, {Component}              from 'react';
import utils                           from '../utils/helper.js'

import '../css/footer.css';
import '../css/search.css';

class ViewRoutes extends Component {
  constructor(props){
    super(props);

    this.state = {
      results: []
    }
  }

  showRoutes(){

    let results;
    utils.getAllRoutes().then((res) => {

      this.setState({
        results: res.data
      })
    })

    results = this.state.results;
    let r;
    if(results.length){
      r = results.map((item, index)=>{

        let spString = item.shortest_path.split("|");
        let path = spString.map((elem, index)=> {
          return (
            <div key={index}>
              {elem}
            </div>
          )
        })
        return (
          <div key={index}>
            <div>{item.name}: {path}</div>
            <button>View More Info</button>
          </div>

        )
      })

    }

    return (r)
  }


  render() {

    return (
      <div>
        {this.showRoutes()}
      </div>
    )
  }
}

export default ViewRoutes;
