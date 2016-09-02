import React, {Component}   from 'react';
import {browserHistory}     from 'react-router';
import Model                from './NameModal.js'
import '../css/search.css';
class Directions extends Component {

  constructor(props){
    super(props);
    this.state = {
      clicked: false
    }
  }

  makeDirections(){
    let directions = this.props.directions;
    let dirToRender = "<h3 class='dir-h3'>Directions:</h3>";
    for(let prop in directions){
      for(let info in directions[prop]){
        if(info === 'start_address'){

          dirToRender += "<div class='dirToRender'>From: " + directions[prop][info] + "</div><br/>";
        }
        if(info === 'end_address'){
          dirToRender += "<div class='dirToRender'> To: " + directions[prop][info] + "</div><br/>";
        }

        if(info === 'steps'){
          let steps = ""
          directions[prop][info].map(function(step, index){
              dirToRender += step.html_instructions += '<br>';
          });
        }
      }
    }

    return (
      <div dangerouslySetInnerHTML ={{__html: dirToRender}}/>
    )
  }

  createRouteToSave(event){
    this.setState({clicked: true})

  }

  render() {
    let directions = this.props.directions;
    let length = directions.length;
    let sp = this.props.shortestPath
    let clicked = this.state.clicked;

    return (
      <div>
        <div className="directions-col">

          <div className="directions-row">
            {length > 0 ? this.makeDirections(): ""}
          </div>

          <div className="directions-row">
            <button className="directions-button-save"
              onClick={(event)=> this.createRouteToSave(event)}>Save Route</button>
            {clicked ? <Model sp={sp}/> : ""}
          </div>

        </div>

      </div>
    );
  }

}

export default Directions;
