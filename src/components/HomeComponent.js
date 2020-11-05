import React from 'react';
import '../styles/home.scss';

class HomeComponent extends React.Component {

   constructor() {
      super();
      this.myRef = React.createRef();
      this.state = {
         users: [],
         carouselStyle: {
            width: 100 + "%",
            backgroundSize: "cover",
            backgroundImage: 'url(../images/bg2.jpg)'
         }
      }
   }

   componentDidMount() {
      // const node = this.myRef.current;
      this.novaFunkcija();
   }

   novaFunkcija() {
      let currentIndex = 2;
      const totalCount = 3;
      setInterval(() => {
         if (currentIndex > totalCount) {
            currentIndex = 1;
         }
         // this.setState({ carouselStyle: {
         //    backgroundImage: `url(images/bg${currentIndex}.jpg)`
         // }});
         const carouselStyle = { ...this.state.carouselStyle };
         carouselStyle.backgroundImage = `url(images/bg${currentIndex}.jpg)`;
         this.setState({ carouselStyle });
         currentIndex++;
      }, 3000);
   }

   render() {
      return (
         <div id="tijelo" ref={this.myRef} style={ this.state.carouselStyle }>
            <div style={{width: 100 + "%"}}>
               <div className="row">
                  <div className="col-xs-12">
                     <h3 style={{ marginBottom: 25 + "px !important" }}>
                        <center></center>
                     </h3>
                  </div>
               </div>
               <div className="row">
                  <div className="col-md-4 col-md-offset-1 col-xs-12">
                     <form id="loginForm">
                        <div className="form-group">
                           <label htmlFor="username">Korisničko ime:</label>
                           <input id="username" className="form-control" type="text" placeholder="Unesite korisničko ime"/>
                        </div>
                        <div className="form-group">
                           <label htmlFor="password">Lozinka:</label>
                           <input id="password" className="form-control" type="password" placeholder="Unesite lozinku"/>
                        </div>
                        <input type="submit" className="btn btn-primary" value="Uloguj se"/>
                        <a className="btn" href="register" id="registerBtn">Registracija</a>
                     </form>
                  </div>
                  <div className="col-md-4 col-md-offset-1 col-xs-12" id="prices" style={{backgroundColor: "white"}}>
                     <h3 style={{textAlign: "center", marginBottom: 25 + "px"}}>Promotivne cijene:</h3>
                     <div id="toreplace">
                        <table style={{display: "none"}} id="firsttable" className="table">
                           <thead>
                           <tr>
                              <th colSpan="3">Iz Beograda za:</th>
                           </tr>
                           </thead>
                           <tbody>
                           {/*<?php*/}
                           {/*while($count <= 5 && $count < count($resultPromo)){*/}
                           {/*    $row = (array) $resultPromo[$count];*/}
                           {/*?>*/}
                           <tr>
                              <td style={{width: 50 + "%"}}>
                                 {/*<?php  echo $row['city_to']; ?>*/}
                              </td>
                              <td style={{width: 30 + "%"}}>
                                 {/*<?php echo round($row['price']); ?>&euro;*/}
                              </td>
                              <td style={{width: 20 + "%"}}>
                                 <a className="btn btn-success" href="#">Kupi</a>
                              </td>
                           </tr>
                           {/*<?php*/}
                           {/*$count++;*/}
                           {/*} ?>*/}
                           </tbody>
                        </table>
                        <table style={{display: "none"}} id="secondtable" className="table">
                           <thead>
                           <tr>
                              <th colSpan="3">Iz Beograda za:</th>
                           </tr>
                           </thead>
                           <tbody>
                           {/*<?php while($count < count($resultPromo)){*/}
                           {/*    $row = (array) $resultPromo[$count];*/}
                           {/*?>*/}
                           <tr>
                              <td style={{width: 50 + "%"}}>
                                 {/*<?php  echo $row['city_to']; ?>*/}
                              </td>
                              <td style={{width: 30 + "%"}}>
                                 {/*<?php echo round($row['price']); ?>&euro;*/}
                              </td>
                              <td style={{width: 20 + "%"}}>
                                 <a className="btn btn-success" href="#">Kupi</a>
                              </td>
                           </tr>
                           {/*<?php*/}
                           {/*    $count++;*/}
                           {/*    }*/}
                           {/*?>*/}
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default HomeComponent;