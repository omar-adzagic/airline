import React, {useContext, useEffect, useState, useMemo} from 'react';
import '../styles/home.scss';
import PromotionsService from "../services/PromotionsService";
import { UserContext } from "./UserContext";
import FlightsService from "../services/FlightsService";
import ReservationsService from "../services/ReservationsService";
import {convertToDateTimeFormat} from "../libraries/my-libs";

function HomeComponent() {
   const [reservations, setReservations] = useState([]);
   const [reservationsStats, setReservationsStats] = useState([]);
   const [stats, setStats] = useState([]);
   const [promotions, setPromotions] = useState([]);
   const [showPromotions, setShowPromotions] = useState([]);
   const [myRef, setMyRef] = useState(null);
   const [carouselStyle, setCarouselStyle] = useState({
      width: 100 + "%",
      backgroundSize: "cover",
      backgroundImage: 'url(../images/bg2.jpg)'
   });
   const { value, setValue } = useContext(UserContext);
   const firstName = value.firstName;
   console.log(value);

   const imageSlider = () => {
      let currentIndex = 2;
      const totalCount = 3;
      setInterval(() => {
         if (currentIndex > totalCount) {
            currentIndex = 1;
         }
         const carouselStyleDuplicate = { ...carouselStyle };
         carouselStyleDuplicate.backgroundImage = `url(images/bg${currentIndex}.jpg)`;
         setCarouselStyle(carouselStyleDuplicate);
         currentIndex++;
      }, 3000);
   };

   const changeShowPromotions = promotions => {
      let currentIndex = 0;
      const initialShowPromotions = promotions.slice(currentIndex, currentIndex + 5);
      setShowPromotions(initialShowPromotions);
      const totalCount = promotions.length;
      setInterval(() => {
         if (currentIndex > totalCount) {
            currentIndex = 0;
         }
         const showPromotions = promotions.slice(currentIndex, currentIndex + 5);
         setShowPromotions(showPromotions);
         currentIndex += 5;
      }, 7000);
   };

   const buyTicket = () => {

   };

   useEffect(() => {
      // PromotionsService.getPromotions().then(response => {
      //    setPromotions(response.data.promotions);
      //    changeShowPromotions(response.data.promotions);
      // });
      ReservationsService.getReservations().then(response => {
         setReservations(response.data);
      });
      ReservationsService.getHomeData().then(response => {
         console.log(response.data);
         setReservationsStats(response.data)
      });
      imageSlider();
      setMyRef(React.createRef());
   }, []);

   return (
       <div style={{ width: "100%" }}>
          <div className="slideshow">
             <div className="slideshow-image" style={{ backgroundImage: "url('./images/BYAJ3H.jpg')" }}></div>
             <div className="slideshow-image" style={{ backgroundImage: "url('./images/istockphoto-183238400-1024x1024.jpg')" }}></div>
             <div className="slideshow-image" style={{ backgroundImage: "url('./images/istockphoto-1147221668-1024x1024.jpg')" }}></div>
             <div className="slideshow-image" style={{ backgroundImage: "url('./images/stock-photo-london-uk-march-a-virgin-atlantic-airplane-taxis-on-tarmac-at-heathrow-airport-the-1674617722.jpg')" }}></div>
          </div>

          <div className="home-container">
             <div>
                <h2 className="text-center mt-3 mb-5">Posljednje rezervacije</h2>
                <table className="table table-striped table-bordered" id="adminpocetnatabela">
                   <thead>
                   <tr>
                      <th>Osoba</th>
                      <th>Vrijeme rezervacije</th>
                      <th>Mjesto polaska</th>
                      <th>Destinacija</th>
                      <th>Model aviona</th>
                      <th>Klasa leta</th>
                      <th>Cijena</th>
                   </tr>
                   </thead>
                   <tbody>
                   {/*<?php*/}
                   {/*$sql = "select u.name, r.time, r.class, f.city_from, f.city_to, a.model, f.price from users u, reservations r, airplanes a, flights f where u.id = r.user_id and a.id = f.airplane_id and r.id not in(select id from cancelled_reservations) and f.id = r.flight_id order by r.time desc limit 3";*/}
                   {/*$result = DB::select(DB::raw($sql));*/}
                   {/*foreach($result as $row){*/}
                   {/*    $row = (array) $row;*/}
                   {/*    $price = $row["price"];*/}
                   {/*    if($row['class'] == 'Ekonomicna'){*/}
                   {/*        $price = $price * 0.4;*/}
                   {/*    }*/}
                   {/*    ?>*/}
                   {reservations.map(reservation => {
                      return (
                          <tr key={reservation.id}>
                             <td>{ `${reservation.user.firstName} ${reservation.user.lastName}` }</td>
                             <td>{ convertToDateTimeFormat(reservation.time, 'DD/MM/YYYY HH:mm') }</td>
                             <td>{ reservation.flight.cityFrom }</td>
                             <td>{ reservation.flight.cityTo }</td>
                             <td>{ reservation.flight.airplane.model }</td>
                             <td>{ reservation.reservationClass }</td>
                             <td>{ reservation.flight.price } &euro;</td>
                          </tr>
                      );
                   })}
                   </tbody>
                </table>
             </div>
             <div className="col-xs-3 col-xs-offset-2">
                <div id="stats">
                   <span className="glyphicon glyphicon-stats"></span>
                   <h3>Statistika rezervacija:</h3>
                   { `Danas: (${reservationsStats.today} - ${reservationsStats.todayWithCanceled})` }<br />
                   { `Ovog mjeseca: (${reservationsStats.month} - ${reservationsStats.monthWithCanceled})` }<br />
                   { `Ove godine: (${reservationsStats.year} - ${reservationsStats.yearWithCanceled})` }
                   {/*<?php*/}
                   {/*$sqlStats1 =  "select count(r.id) as count from reservations r, cancelled_reservations cr where day(r.time) = day(now()) and r.id = cr.id";*/}
                   {/*$sqlStats11 =  "select count(r.id) as count from reservations r where day(r.time) = day(now())";*/}
                   {/*$today1 = ((array)DB::select(DB::raw($sqlStats1))[0])["count"];*/}
                   {/*$today2 = ((array)DB::select(DB::raw($sqlStats11))[0])["count"];*/}
                   {/*$sqlStats2 =  "select count(r.id) as count from reservations r, cancelled_reservations cr where month(r.time) = month(now()) and r.id = cr.id";*/}
                   {/*$sqlStats22 =  "select count(r.id) as count from reservations r where month(r.time) = month(now())";*/}
                   {/*$month1 = ((array)DB::select(DB::raw($sqlStats2))[0])["count"];*/}
                   {/*$month2 = ((array)DB::select(DB::raw($sqlStats22))[0])["count"];*/}
                   {/*$sqlStats3 =  "select count(r.id) as count from reservations r, cancelled_reservations cr where year(r.time) = year(now()) and r.id = cr.id";*/}
                   {/*$sqlStats33 =  "select count(r.id) as count from reservations r where year(r.time) = year(now())";*/}
                   {/*$year1 = ((array)DB::select(DB::raw($sqlStats3))[0])["count"];*/}
                   {/*$year2 = ((array)DB::select(DB::raw($sqlStats33))[0])["count"];*/}
                   {/*echo "Danas: " . ($today2 - $today1) . "<br>Ovog mjeseca: " . ($month2 - $month1) . "<br>Ove godine:" . ($year2 - $year1);*/}
                   {/*?>*/}
                </div>
             </div>
          </div>
       </div>
   );

   {/*<div id="tijelo" ref={ myRef } style={ carouselStyle }>*/}
   {/*   <div style={{width: 100 + "%"}}>*/}
   {/*      <div className="row">*/}
   {/*         <div className="col-xs-12">*/}
   {/*            <h3 style={{ marginBottom: 25 + "px !important" }}>*/}
   {/*               <center></center>*/}
   {/*            </h3>*/}
   {/*         </div>*/}
   {/*      </div>*/}
   {/*      <div className="row">*/}
   {/*         <div className="" id="prices" style={{ backgroundColor: "white" }}>*/}
   {/*            <h3 className="text-center">Promotivne cijene</h3>*/}
   {/*            <div id="toreplace">*/}
   {/*               <table id="secondtable" className="table">*/}
   {/*                  <thead>*/}
   {/*                  <tr>*/}
   {/*                     <th colSpan="3">Iz Beograda za:</th>*/}
   {/*                  </tr>*/}
   {/*                  </thead>*/}
   {/*                  <tbody>*/}
   {/*                  {showPromotions.map(promotion => {*/}
   {/*                     return (*/}
   {/*                        <tr key={promotion.id}>*/}
   {/*                           <td>*/}
   {/*                              { promotion.flight.cityTo }*/}
   {/*                           </td>*/}
   {/*                           <td>*/}
   {/*                              { promotion.flight.price } &euro;*/}
   {/*                           </td>*/}
   {/*                           <td>*/}
   {/*                              <button type="button" className="btn btn-primary" onClick={buyTicket}>*/}
   {/*                                 Kupi*/}
   {/*                              </button>*/}
   {/*                           </td>*/}
   {/*                        </tr>*/}
   {/*                     );*/}
   {/*                  })}*/}
   {/*                  </tbody>*/}
   {/*               </table>*/}
   {/*            </div>*/}
   {/*         </div>*/}
   {/*      </div>*/}
   {/*   </div>*/}
   {/*</div>*/}
}

export default HomeComponent;