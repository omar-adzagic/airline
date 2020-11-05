import React from 'react';
import "../styles/modal.scss";

class AirplaneCreate extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         airplanes: [],
         model: '',
         capacity: '',
         year: '',
      };
   }

   onClose = e => {
      this.props.onClose && this.props.onClose(e);
   };

   render() {
      if (!this.props.show) {
         return null;
      }
      return (
         <div className="custom-modal" id="modal">
            <h2>{this.props.title}</h2>
            <div className="content">{this.props.children}</div>
            <div className="actions">
               <button className="toggle-button" onClick={e => { this.onClose(e) }}>
                  Zatvori
               </button>
               {/*<button className="toggle-button" >*/}
               {/*   Sačuvaj*/}
               {/*</button>*/}
            </div>
         </div>
      )
   }
}

export default AirplaneCreate;