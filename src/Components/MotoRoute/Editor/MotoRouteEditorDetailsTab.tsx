import React, { Fragment, useMemo } from "react"

import moment from "moment";
import Select from 'react-select';

import "./MotoRouteEditor.scss"


const range = (from: number, to: number, step: number = 1) => {
    if (step === 0) {
        throw new Error("Step cannot be 0")
    }

    if (from === to || (from < to && step < 0) || (from > to && step > 0)) {
        return []
    }

    let result: number[] = []
    for (let i = from; i < to; i += step) {
        result.push(i)
    }

    return result;
}

export type FieldErrorType = {
    name: string | null, 
    description: string | null,
}

export const blankError = {
    name: null, 
    description: null,
};


const allMonths = moment.months().map((month, index) => (
    {
        /* +1 because January is the 1st month, not the 0 month */
        value: index + 1, label: month
    }
))

type dateSelectFieldType = {
    month: number,
    day: number
}

export type MotoRouteDetailsDataType = {
    name: string,
    description: string,
    date_open: dateSelectFieldType,
    date_closed: dateSelectFieldType,
    open_all_year: boolean,
    difficulty: number,
    time_to_complete_h: number,
    time_to_complete_m: number,
    distance: number,
}

export const initialRouteData: MotoRouteDetailsDataType = {
    name: "",
    description: "",
    date_open: {month: 1, day: 1},
    date_closed: {month: 1, day: 1},
    open_all_year: true,
    difficulty: 1,
    time_to_complete_h: 0,
    time_to_complete_m: 10,
    distance: 0,
}


const selectNoBorderStyles = {
    control: (styles: any, state: any) => ({ 
        ...styles, 
        border: 'none',
        boxShadow: 'none', // disable blue outline on focus
    }),
}

const MIN_NAME_LENGTH = 5;
const MAX_NAME_LENGTH = 35;
const MIN_DESCRIPTION_LENGTH = 20;
const MAX_DESCRIPTION_LENGTH = 400;

export const MOTO_ROUTE_NAME_LENGTH_BOUNDS = {min: MIN_NAME_LENGTH, max: MAX_NAME_LENGTH}
export const MOTO_ROUTE_DESCRIPTION_LENGTH_BOUNDS = {min: MIN_DESCRIPTION_LENGTH, max: MAX_DESCRIPTION_LENGTH}

const DEFAULT_DESCRIPTION_ROWS = 4;

type MotoRouteEditorDetailsTabProps = {
    motoRouteDetailsData: MotoRouteDetailsDataType,
    handleChange: (field: string, newVal: any) => void,
    fieldErrors: FieldErrorType,
}

const MotoRouteEditorDetailsTab = (props: MotoRouteEditorDetailsTabProps) => {
 
    const { motoRouteDetailsData, handleChange, fieldErrors } = props


    const descriptionCharactersLeft = useMemo(() => {
        return MAX_DESCRIPTION_LENGTH - motoRouteDetailsData.description.length
    }, [motoRouteDetailsData.description])





    // ================== Date start and end date ===============================


    const getMaxDayInMonth = (month: number): number => {
        if (month < 1 || month > 12) {
            throw new Error(`${month} is not a valid month number`)
        }

        // 2001, because any non-leap-year is fine
        // -1 because moment sees January as 0
        return moment().year(2001).month(month-1).daysInMonth()
    }

    const getDaysInMonth = (month: number): {value: number, label: string}[] =>  {
        if (month < 1 || month > 12) {
            throw new Error(`${month} is not a valid month number`)
        }

        // 2001, because any non-leap-year is fine
        // -1 because moment sees January as 0
        return Array.from(Array(moment().year(2001).month(month-1).daysInMonth()), (_, i) => (
            {value: i + 1, label: (i+1).toString()}
        ))
    }

    const handleMonthChange = (field: string, currentDay: number, newMonth: number) => {
        var newDay = currentDay
        var maxDay = getMaxDayInMonth(newMonth)

        if (newDay > maxDay) {
            newDay = maxDay
        }

        handleChange(field, {day: newDay, month: newMonth})
    }

    // =======================================================================================

    const MAX_DIFFICULTY = 10
    const MAX_HOURS_TO_COMPLETE = 23
    const MAX_MINUTES_TO_COMPLETE = 60
    

    return (
        <Fragment>
            <div className="moto-route-editor-details-container">
                <h3>Route Details</h3>

                {/* name */}
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input 
                        className={ `loginbox-form-control form-control ${ fieldErrors.name ? "invalid" : "" }` }
                        name="name" 
                        type="text" 
                        placeholder="Route name" 
                        value={ motoRouteDetailsData.name } 
                        onChange={ (e: any) => handleChange(e.target.name, e.target.value) } 
                    />
                    { fieldErrors.name && (
                        <div className="invalid-prompt">
                            { fieldErrors.name }
                        </div>
                    )}
                </div>

                {/* description*/}
                <div className="form-group">
                    <label htmlFor="name">Description:</label>
                    <textarea 
                        className={ `loginbox-form-control form-control ${ fieldErrors.description ? "invalid" : "" }` }
                        name="description" 
                        placeholder="Route description" 
                        value={ motoRouteDetailsData.description } 
                        onChange={ (e: any) => handleChange(e.target.name, e.target.value) } 
                        maxLength={ MAX_DESCRIPTION_LENGTH }
                        rows={ DEFAULT_DESCRIPTION_ROWS }
                    />
                    <small>Characters left: {descriptionCharactersLeft}</small>
                    { fieldErrors.description && (
                        <div className="invalid-prompt">
                            { fieldErrors.description }
                        </div>
                    )}
                </div>

                {/* date open / closed */}
                <div className="time-data-container">
                    <div className="open-all-year-container input-group">
                        <input 
                            type="checkbox" 
                            name="is_open_full_year"
                            checked={ motoRouteDetailsData.open_all_year }
                            onChange={() => handleChange("open_all_year", !motoRouteDetailsData.open_all_year)} />
                        <label htmlFor="is_open_full_year">&nbsp;&nbsp;Open all year</label>
                    </div>

                    { !motoRouteDetailsData.open_all_year && (
                        <Fragment>
                            <div className="input-group">
                                <label className="input-group-text" htmlFor="date-open">Open from:</label>
                                <Select
                                    menuPlacement="top"
                                    className="form-control"
                                    styles={ selectNoBorderStyles }
                                    value={ {value: motoRouteDetailsData.date_open.day, label: motoRouteDetailsData.date_open.day.toString()} }
                                    options={ getDaysInMonth(motoRouteDetailsData.date_open.month) }
                                    onChange={ (newOption: any) => 
                                        handleChange("date_open", {...motoRouteDetailsData.date_open, day: newOption.value}) }
                                />

                                <Select
                                    menuPlacement="top"
                                    className="form-control"
                                    styles={ selectNoBorderStyles }
                                    value={ {value: motoRouteDetailsData.date_open.month, label: moment.months()[motoRouteDetailsData.date_open.month-1]} }
                                    options={ allMonths }
                                    onChange={ (newOption: any) => handleMonthChange("date_open", motoRouteDetailsData.date_open.day, newOption.value) }
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-group-text" htmlFor="date-open">Open to:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                <Select
                                    menuPlacement="top"
                                    className="form-control"
                                    styles={ selectNoBorderStyles }
                                    value={ {value: motoRouteDetailsData.date_closed.day, label: motoRouteDetailsData.date_closed.day.toString()} }
                                    options={ getDaysInMonth(motoRouteDetailsData.date_closed.month) }
                                    onChange={ (newOption: any) => 
                                        handleChange("date_closed", {...motoRouteDetailsData.date_closed, day: newOption.value}) }
                                />

                                <Select
                                    menuPlacement="top"
                                    className="form-control"
                                    styles={ selectNoBorderStyles }
                                    value={ {value: motoRouteDetailsData.date_closed.month, label: moment.months()[motoRouteDetailsData.date_closed.month-1]} }
                                    options={ allMonths }
                                    onChange={ (newOption: any) => handleMonthChange("date_closed", motoRouteDetailsData.date_closed.day, newOption.value) }
                                />
                            </div>
                        </Fragment>
                    )}
                </div>

                {/* difficulty */}
                <div className="input-group">
                    <label className="input-group-text" htmlFor="date-open">Difficulty:&nbsp;&nbsp;&nbsp;</label>
                    <Select
                        menuPlacement="top"
                        className="form-control"
                        styles={ selectNoBorderStyles }
                        value={ {value: motoRouteDetailsData.difficulty, label: motoRouteDetailsData.difficulty.toString() }  }
                        options={ range(1, MAX_DIFFICULTY+1).map((i) => ({value: i, label: (i).toString()})) }
                        onChange={ (newOption: any) => handleChange('difficulty', newOption.value) }
                    />
                    <label className="input-group-text" >out of 10</label>
                </div>

                {/* time to complete */}
                <div className="input-group">
                    <label className="input-group-text" htmlFor="date-open">Time to complete:</label>
                    <Select
                        menuPlacement="top"
                        components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                        className="form-control"
                        styles={ selectNoBorderStyles }
                        value={ {value: motoRouteDetailsData.time_to_complete_h, label: motoRouteDetailsData.time_to_complete_h.toString() }  }
                        options={ range(0, MAX_HOURS_TO_COMPLETE+1).map((i) => ({value: i, label: (i).toString()})) }
                        onChange={ (newOption: any) => handleChange('time_to_complete_h', newOption.value) }
                    />
                    <label className="input-group-text" >hours</label>

                    <Select
                        menuPlacement="top"
                        components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                        className="form-control"
                        styles={ selectNoBorderStyles }
                        value={ {value: motoRouteDetailsData.time_to_complete_m, label: motoRouteDetailsData.time_to_complete_m.toString() }  }
                        options={ range(0, MAX_MINUTES_TO_COMPLETE, 10).map((i) => ({value: i, label: (i).toString()})) }
                        onChange={ (newOption: any) => handleChange('time_to_complete_m', newOption.value) }
                    />
                    <label className="input-group-text" >minutes</label>
                </div>

                {/* distance */}
                <div>   
                    <p>Distance: { motoRouteDetailsData.distance.toFixed(2) } km</p>
                </div>

            </div>
        </Fragment>
    )
}

export default MotoRouteEditorDetailsTab;