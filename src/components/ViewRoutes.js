import React, {Component}       from 'react';
import utils                    from '../utils/helper.js'
import NavBar                   from './NavBar.js';
import Header                   from './Header.js';
import '../css/footer.css';
import '../css/search.css';
import '../css/grid.css';

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
          <div className="box">
          <div className="item-name">
            {item.name}
          </div>
          <div className="item-path">
            {path}
          </div>
          <button>Delete Route</button>
          </div>
        </div>
        )
      })

    }

    return (r)
  }


  render() {

    return (
      <div>
        <Header/>
        <NavBar/>

        <div className="grid-outer">
          <div className="grid">
              {this.showRoutes()}
          </div>
        </div>
      </div>
    )
  }
}

export default ViewRoutes;
