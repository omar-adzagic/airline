import React, {useContext, useEffect, useState, useMemo} from 'react';
import '../styles/home.scss';
import PromotionsService from "../services/PromotionsService";
import { UserContext } from "./UserContext";

function HomeComponent() {
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
      PromotionsService.getPromotions().then(response => {
         setPromotions(response.data.promotions);
         changeShowPromotions(response.data.promotions);
      });
      imageSlider();
      setMyRef(React.createRef());
   }, []);

   return (
      <div id="tijelo" ref={ myRef } style={ carouselStyle }>
         <div style={{width: 100 + "%"}}>
            <div className="row">
               <div className="col-xs-12">
                  <h3 style={{ marginBottom: 25 + "px !important" }}>
                     <center></center>
                  </h3>
               </div>
            </div>
            <div className="row">
               <div className="" id="prices" style={{ backgroundColor: "white" }}>
                  <h3 className="text-center">Promotivne cijene</h3>
                  <div id="toreplace">
                     <table id="secondtable" className="table">
                        <thead>
                        <tr>
                           <th colSpan="3">Iz Beograda za:</th>
                        </tr>
                        </thead>
                        <tbody>
                        {showPromotions.map(promotion => {
                           return (
                              <tr key={promotion.id}>
                                 <td>
                                    { promotion.flight.cityTo }
                                 </td>
                                 <td>
                                    { promotion.flight.price } &euro;
                                 </td>
                                 <td>
                                    <button type="button" className="btn btn-primary" onClick={buyTicket}>
                                       Kupi
                                    </button>
                                 </td>
                              </tr>
                           );
                        })}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default HomeComponent;