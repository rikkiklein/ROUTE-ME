import React, { Component }   from 'react';
import utils                  from '../utils/helper.js'
import { Link }               from 'react-router';
import NavBar                 from './NavBar.js';
import Footer                 from './Footer.js';
import Header                 from './Header.js';
import { Modal }              from 'react-bootstrap';

import '../css/header.css';

class NameModal extends Component {

  constructor(){
     super();
     this.state = {
       value: "",
       showModal: true
     }
   }

   handleSubmit(event){
     event.preventDefault();

   }
   render(){
     return (
       <div className="event-modal">
         <Modal show={this.state.showModal}>
           <Modal.Header id="modal-header">
             <Modal.Title id="event-title">Route</Modal.Title>
           </Modal.Header>
             <Modal.Body>
               <form id="event-form" onSubmit={(event)=>this.handleSubmit(event)}>
                 <input id="route-name" type="text" placeholder="Route Name" ></input>

                 <br/>
                 <button id="route-button" type="submit">Add</button>
               </form>
             </Modal.Body>
         </Modal>
       </div>
     )
   }
 }

export default NameModal;

// <div className="button"><Link to="/search">Get Started!</Link></div>
