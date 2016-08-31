import React, {Component}   from 'react';


class Directions extends Component {


  constructor(props){
    super(props);

  }

  makeDirections(){
    let directions = this.props.directions;
    let dirToRender = "";
    for(let prop in directions){
      console.log(directions[prop]);
      for(let info in directions[prop]){
        if(info === 'start_address'){

          dirToRender += "<div>From " + directions[prop][info] + "</div>";
        }
        if(info === 'end_address'){
          dirToRender += "<div> To " + directions[prop][info] + "</div>";
        }

        if(info === 'steps'){
          let steps = ""
          directions[prop][info].map(function(step, index){
              dirToRender += step.html_instructions;
          });

          //dirToRender.push(steps)
        }
      }
    }

    console.log("dirToRender", dirToRender);
    return (
      <div dangerouslySetInnerHTML ={{__html: dirToRender}}/>
    )
  }

  render() {
    let directions = this.props.directions;
    let length = directions.length;
    return (
      <div>
        {length > 0 ? this.makeDirections(): ""}
      </div>
    );
  }

}

export default Directions;
