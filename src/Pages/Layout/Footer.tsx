import React from "react";

import "./Footer.scss"

/*
    Icons used:
        food: https://www.flaticon.com/premium-icon/restaurant_685301
        vista: https://www.flaticon.com/premium-icon/mountain_2404113
        urbex: https://www.flaticon.com/free-icon/bank_2780776
        danger: https://www.flaticon.com/premium-icon/dangerous_2012485
        fuel: https://www.flaticon.com/free-icon/gas-station_483497
        other: https://www.flaticon.com/premium-icon/more-information_2740648

*/

const Footer = () => {
    return (
        <div className="row footer">
            <h2>
                Disclaimer: this website is a prototype. Some route information might be outdated or fictional.
                Please do not use this website as your only resource when planning your trips.
            </h2>

            <div className="sources">
                <h6>Sources:</h6>
                <ul>
                    <li>Icon - food: <a href="https://www.flaticon.com/premium-icon/restaurant_685301">https://www.flaticon.com/premium-icon/restaurant_685301</a></li>
                    <li>Icon - vista: <a href="ttps://www.flaticon.com/premium-icon/mountain_2404113">https://www.flaticon.com/premium-icon/mountain_2404113</a></li>
                    <li>Icon - urbex: <a href="https://www.flaticon.com/free-icon/bank_2780776">https://www.flaticon.com/free-icon/bank_2780776</a></li>
                    <li>Icon - danger: <a href="https://www.flaticon.com/premium-icon/dangerous_2012485">https://www.flaticon.com/premium-icon/dangerous_2012485</a></li>
                    <li>Icon - fuel: <a href="https://www.flaticon.com/free-icon/gas-station_483497">https://www.flaticon.com/free-icon/gas-station_483497</a></li>
                    <li>Icon - other: <a href="https://www.flaticon.com/premium-icon/more-information_2740648">https://www.flaticon.com/premium-icon/more-information_2740648</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Footer