import React, { CSSProperties, Fragment, useEffect, useState } from "react";
import { getAllAccidents } from "src/Actions/AccidentsActions";
import AccidentMapComponent from "src/Components/AccidentMapComponent";
import { AccidentType } from "src/Types/AccidentTypes";

import { toast } from 'react-toastify';
import ToasterStyles from "../ToasterStyles/ToasterStyles"
import ReactLoading from "react-loading";

import "./MainPage.scss"
import "../Components/MotoRoute/MotoRouteDetails/MotoRouteDetails.scss"

const dateToString = (date: Date) => {
    return date.getDate()  + "-" + (date.getMonth()+1) + "-" + date.getFullYear()
}

const wrapperStyle: CSSProperties = {
    minHeight: "20em",
    display: "flex",
    alignItems: "center"
}


const AccidentMap = () => {

    const [loading, setLoading] = useState(true)
    const [accidents, setAccidents] = useState<AccidentType[]>([])

    useEffect(() => {


        const _getAccidents = async () => {
            const response = await getAllAccidents()
            console.log("respo")
            console.log(response)
            if (response.status !== 200) {
              if (response.data?.messages) {
                toast.error(`Cannot get accidents: ${response.data.messages.join(", ")}`, ToasterStyles);
                return
              }
            }

            setAccidents(response.data.accidents)
            setLoading(false)

            console.log(response.data.accidents)
        }

        _getAccidents()

        return () => {
            
        }
    }, [setLoading])

    return (
        <Fragment>

            
            <div className="row display-flex map-details-container">

                <div className="col-md-8 moto-route-map-container">
                            <div className="accident-heat-map-wrapper" style={wrapperStyle} >
                                {loading && (
                                    <ReactLoading type={ 'spokes' } className="loading-placeholder" />
                                )}

                                {!loading && (
                                    <AccidentMapComponent accidents={accidents} />
                                )}
                            </div>
                </div>


                <div className="col-md-4 moto-route-details-container">
                    <div className="moto-route-details">
                        <ul className="nav nav-tabs details-nav">
                            <h5 style={{color: 'white', padding: '0.5em 1em'}}>Accidents involving motorcycles</h5>
                        </ul>

                    <div className="details-content">
                        <h5>Choose dates</h5>
                        From: <br />
                        To: 
                        <br />
                        Injuries:
                        <ul style={{listStyleType: "none"}}>
                            <li>none (gray)</li>
                            <li>light (yellow)</li>
                            <li>heavy (red)</li>
                            <li>death (black)</li>
                        </ul>
                    </div>

                    </div>
                </div>

            </div>
        </Fragment>
    )
}

export default AccidentMap