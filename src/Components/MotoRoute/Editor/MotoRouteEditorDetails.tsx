import React, { Fragment } from "react";
import { GeoAltFill, InfoCircleFill, MapFill } from "react-bootstrap-icons";
import { NavLink, Route, Routes, useMatch } from "react-router-dom";
import { POIType } from "src/Types/MotoRoutesTypes";
import MotoRouteEditorDetailsTab, { MotoRouteDetailsDataType, FieldErrorType as MotoRouteFieldErrorType } from "./MotoRouteEditorDetailsTab";
import MotoRouteEditorPOITab, { CompositePOIFieldErrorType } from "./MotoRouteEditorPOITab";
import MotoRouteEditorRouteTab from "./MotoRouteEditorRouteTab";


import "./MotoRouteEditor.scss"


type MotoRouteDetailsEditorProps = {
    route: {lat: number, lng: number}[];
    setRoute: (_: {lat: number, lng: number}[]) => void;
    removeWaypoint: (index: number) => void;
    pois: POIType[]
    setPois: (_: POIType[]) => void
    selectedPOI: POIType | null
    onPOISelect: (poi: POIType | null) => void
    onPOIHover: (mouseenter: boolean, poi: POIType) => void
    handlePOIDetailsChange: (id: number, field: string, value: any) => void
    removePOI: (index: number) => void,
    resetRoute: () => void,
    submitRoute: () => void,
    motoRouteDetailsData: MotoRouteDetailsDataType,
    handleRouteDataChange: (field: string, newVal: any) => void,
    motoRouteFieldErrors: MotoRouteFieldErrorType,
    poiFieldErrs: CompositePOIFieldErrorType
}

const MotoRouteEditorDetails = (props: MotoRouteDetailsEditorProps) => {
    const { 
        route,
        setRoute, 
        removeWaypoint, 
        pois, 
        setPois, 
        selectedPOI, 
        onPOISelect, 
        onPOIHover, 
        handlePOIDetailsChange, 
        removePOI,
        resetRoute,
        submitRoute,
        motoRouteDetailsData,
        handleRouteDataChange,
        motoRouteFieldErrors,
        poiFieldErrs
    } = props


    const urlMatch = useMatch('/routes/editor/:id/*')


    return urlMatch !== null ? (
        <Fragment>
            <div className="moto-route-details">
                <div className="details-navigation">
                    <ul className="nav nav-tabs details-nav">
                        <NavLink
                            className="nav-link"
                            to={`${urlMatch.pathnameBase}/details`}
                            title="Route details">
                                <InfoCircleFill />
                        </NavLink>
                        <NavLink
                            className={`nav-link`}
                            to={`${urlMatch.pathnameBase}/route`}
                            title="Route">
                                <MapFill />
                        </NavLink>
                        <NavLink
                            className="nav-link"
                            to={`${urlMatch.pathnameBase}/poi`}
                            title="Points of interest">
                                <GeoAltFill />
                        </NavLink>
                        </ul>
                    </div>


                    <div id="poi-list" className="details-content">
                    <Routes>
                        <Route path="/:id/details" element={
                            <MotoRouteEditorDetailsTab 
                                motoRouteDetailsData={ motoRouteDetailsData }
                                handleChange={ handleRouteDataChange }
                                fieldErrors={ motoRouteFieldErrors }
                            />} 
                        />
                        <Route path="/:id/route" element={
                            <MotoRouteEditorRouteTab 
                                route={ route } 
                                setRoute={ setRoute } 
                                removeWaypoint={ removeWaypoint } 
                            />} 
                        />
                        <Route path="/:id/poi" element={
                            <MotoRouteEditorPOITab 
                                pois={ pois } 
                                setPois={ setPois } 
                                selectedPOI={ selectedPOI }
                                onPOISelect={ onPOISelect }
                                onPOIHover={ onPOIHover }
                                handlePOIDetailsChange={ handlePOIDetailsChange }
                                removePOI={ removePOI }
                                poiFieldErrs={ poiFieldErrs }
                            />} 
                        />
                    </Routes>
                </div> 
                
                <div className="editor-details-footer d-flex justify-content-end">
                    <button className="btn btn-primary" onClick={ resetRoute }>Reset</button>
                    <button className="btn btn-default" onClick={ submitRoute }>Submit</button>
                </div>
            </div>
        </Fragment>
    ) : (<></>)
}

export default MotoRouteEditorDetails;