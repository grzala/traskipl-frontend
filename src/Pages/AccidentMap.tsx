import React, { CSSProperties, Fragment, useEffect, useState } from "react";
import { AccidentInjuryFilters, getAccidentsWithFilters } from "src/Actions/AccidentsActions";
import AccidentMapComponent from "src/Components/AccidentMapComponent";
import { AccidentType } from "src/Types/AccidentTypes";

import { toast } from 'react-toastify';
import ToasterStyles from "../ToasterStyles/ToasterStyles"
import ReactLoading from "react-loading";


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./MainPage.scss"
import "../Components/MotoRoute/MotoRouteDetails/MotoRouteDetails.scss"
import moment from "moment";


const wrapperStyle: CSSProperties = {
    minHeight: "20em",
    display: "flex",
    alignItems: "center"
}

const AccidentMap = () => {

    const [loading, setLoading] = useState(true)
    const [accidents, setAccidents] = useState<AccidentType[]>([])

    const [filters, setFilters] = useState<AccidentInjuryFilters>({
        NONE: false,
        LIGHT: true,
        HEAVY: true,
        DEATH: true,
    })

    const [dateRange, setDateRange] = useState<{from: Date, to: Date}>({
        from: moment().subtract(200, "days").toDate(),
        to: moment().subtract(170, "days").toDate()
    })

    useEffect(() => {


        const _getAccidents = async () => {
            const response = await getAccidentsWithFilters(dateRange.from, dateRange.to, filters)

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
    }, [dateRange, filters, setLoading])

    const setDates = (key: string, value: Date | null) => {
        if (key !== "to" && key !== "from") throw new Error("Only available dates are 'from' and 'to'. Invalid key: " + key)
        if (value === null) return;

        if (key === "from" && value > dateRange.to) {
            toast.error("Date from must be smaller than date to", ToasterStyles)
            return
        }

        if (key === "to" && value < dateRange.from) {
            toast.error("Date to must be bigger than date from", ToasterStyles)
            return
        }

        setDateRange({
            ...dateRange,
            [key]: value
        })
    }

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
                        <small>
                            The accidents data was downloaded for 01/01/2016 - 01/01/2021. It takes time 
                            for accident data to be released by police, so there might be no data on accidents that happened
                            between today and a couple months ago
                        </small>
                        <h5>Choose dates</h5>
                        From:  
                        <DatePicker dateFormat="dd/MM/yyyy" selected={dateRange.from}  onChange={(date) => setDates("from", date)} />
                        To: 
                        <DatePicker dateFormat="dd/MM/yyyy" selected={dateRange.to}  onChange={(date) => setDates("to", date)} />
                        <br />
                        <br />
                        Injuries:
                        <ul style={{listStyleType: "none"}}>
                            <li>
                                <input 
                                    type="checkbox" 
                                    onChange={(e: any) => {
                                        setFilters({...filters, NONE: !filters.NONE})
                                    } }
                                    checked={filters.NONE} 
                                    className="filter-checkbox" 
                                />
                                &nbsp;
                                none (gray)
                            </li>
                            <li>
                                <input 
                                    type="checkbox" 
                                    onChange={(e: any) => {
                                        setFilters({...filters, LIGHT: !filters.LIGHT})
                                    } }
                                    checked={filters.LIGHT} 
                                    className="filter-checkbox" 
                                />
                                &nbsp;
                                light (yellow)
                            </li>
                            <li>
                                <input 
                                    type="checkbox" 
                                    onChange={(e: any) => {
                                        setFilters({...filters, HEAVY: !filters.HEAVY})
                                    } }
                                    checked={filters.HEAVY} 
                                    className="filter-checkbox" 
                                />
                                &nbsp;
                                heavy (red)
                            </li>
                            <li>
                                <input 
                                    type="checkbox" 
                                    onChange={(e: any) => {
                                        setFilters({...filters, DEATH: !filters.DEATH})
                                    } }
                                    checked={filters.DEATH} 
                                    className="filter-checkbox" 
                                />
                                &nbsp;
                                death (black)
                            </li>
                        </ul>
                    </div>

                    </div>
                </div>

            </div>
        </Fragment>
    )
}

export default AccidentMap