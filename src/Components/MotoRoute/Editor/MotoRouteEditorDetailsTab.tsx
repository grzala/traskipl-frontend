import React, { Fragment, useMemo, useState } from "react"

// Datepicker Range
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import moment from "moment";
import Select from 'react-select';

import "./MotoRouteEditor.scss"

// t.string "name"
// t.string "description"
// t.date "open_start"
// t.date "open_end"
// t.integer "time_to_complete_h"
// t.integer "time_to_complete_m"
// t.integer "difficulty"


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

type FieldErrorType = {
    name: string | null, 
    description: string | null,
    open_date: string | null,
    time_to_complete: string | null,
    difficulty: string | null,
}

const blankError = {
    name: null, 
    description: null,
    open_date: null,
    time_to_complete: null,
    difficulty: null,
};

type MotoRouteDetailsDataType = {
    name: string,
    description: string,
    date_open: string | null,
    date_closed: Date | null,
}

const initialData: MotoRouteDetailsDataType = {
    name: "",
    description: "",
    date_open: null,
    date_closed: null,
}

type dateSelectFieldType = {
    month: {value: number, label: string},
    day: {value: number, label: string}
}

const selectNoBorderStyles = {
    control: (styles: any, state: any) => ({ 
        ...styles, 
        border: 'none',
        boxShadow: 'none' // disable blue outline on focus
    }),
}

const MAX_DESCRIPTION_LENGTH = 400;
const DEFAULT_DESCRIPTION_ROWS = 4;

const MotoRouteEditorDetailsTab = () => {

    const [motoRouteDetailsData, setMotoRouteDetailsData] = useState<MotoRouteDetailsDataType>(initialData);

    const handleChange = (e: any) => {
        setMotoRouteDetailsData({ 
            ...motoRouteDetailsData, 
            [e.target.name]: e.target.value 
        })
    }

    const [fieldErrs, setFieldErrs] = useState<FieldErrorType>(blankError)

    const descriptionCharactersLeft = useMemo(() => {
        return MAX_DESCRIPTION_LENGTH - motoRouteDetailsData.description.length
    }, [motoRouteDetailsData.description])




    // ================== Date start and end date ===============================

    const [openAllYear, setOpenAllYear] = useState<boolean>(true)

    const allMonths = moment.months().map((month, index) => (
        {
            /* +1 because January is the 1st month, not the 0 month */
            value: index + 1, label: month
        }
    ))

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

    const [openFrom, setOpenFrom] = useState<dateSelectFieldType>({month: allMonths[0], day: {value: 1, label: "1"}})
    const [openTo, setOpenTo] = useState<dateSelectFieldType>({month: allMonths[0], day: {value: 1, label: "1"}})

    const handleMonthChange = (newOption: any, stateVar: dateSelectFieldType, changeStateVar: (arg: dateSelectFieldType) => void) => {
        var newDay = stateVar.day
        var maxDay = getMaxDayInMonth(newOption.value)

        if (newDay.value > maxDay) {
            newDay = {value: maxDay, label: maxDay.toString()}
        }

        changeStateVar({day: newDay, month: newOption})
    }

    // =======================================================================================


    const [difficulty, setDifficulty] = useState<number>(1)
    const [timeToComplete_h, setTimeToComplete_h] = useState<number>(0)
    const [timeToComplete_m, setTimeToComplete_m] = useState<number>(10)

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
                        className={ `loginbox-form-control form-control ${ fieldErrs.name ? "invalid" : "" }` }
                        name="name" 
                        type="text" 
                        placeholder="Route name" 
                        value={ motoRouteDetailsData.name } 
                        onChange={ handleChange } 
                    />
                </div>

                {/* description*/}
                <div className="form-group">
                    <label htmlFor="name">Description:</label>
                    <textarea 
                        className={ `loginbox-form-control form-control ${ fieldErrs.description ? "invalid" : "" }` }
                        name="description" 
                        placeholder="Route description" 
                        value={ motoRouteDetailsData.description } 
                        onChange={ handleChange } 
                        maxLength={ MAX_DESCRIPTION_LENGTH }
                        rows={ DEFAULT_DESCRIPTION_ROWS }
                    />
                    <small>Characters left: {descriptionCharactersLeft}</small>
                </div>

                {/* date open / closed */}
                <div className="time-data-container">
                    <div className="open-all-year-container input-group">
                        <input 
                            type="checkbox" 
                            name="is_open_full_year"
                            checked={ openAllYear }
                            onChange={() => setOpenAllYear(!openAllYear)} />
                        <label htmlFor="is_open_full_year">&nbsp;&nbsp;Open all year</label>
                    </div>

                    { !openAllYear && (
                        <Fragment>
                            <div className="input-group">
                                <label className="input-group-text" htmlFor="date-open">Open from:</label>
                                <Select
                                    className="form-control"
                                    styles={ selectNoBorderStyles }
                                    value={ openFrom.day }
                                    options={ getDaysInMonth(openFrom.month.value) }
                                    onChange={ (newOption: any) => 
                                        setOpenFrom({...openFrom, day: newOption})}
                                />

                                <Select
                                    className="form-control"
                                    styles={ selectNoBorderStyles }
                                    value={ openFrom.month }
                                    options={ allMonths }
                                    onChange={ (newOption) => handleMonthChange(newOption, openFrom, setOpenFrom) }
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-group-text" htmlFor="date-open">Open to:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                <Select
                                    className="form-control"
                                    styles={ selectNoBorderStyles }
                                    value={ openTo.day }
                                    options={ getDaysInMonth(openTo.month.value) }
                                    onChange={ (newOption: any) => 
                                        setOpenTo({...openTo, day: newOption})}
                                />

                                <Select
                                    className="form-control"
                                    styles={ selectNoBorderStyles }
                                    value={ openTo.month }
                                    options={ allMonths }
                                    onChange={ (newOption) => handleMonthChange(newOption, openTo, setOpenTo) }
                                />
                            </div>
                        </Fragment>
                    )}
                </div>

                {/* difficulty */}
                <div className="input-group">
                    <label className="input-group-text" htmlFor="date-open">Difficulty:&nbsp;&nbsp;&nbsp;</label>
                    <Select
                        className="form-control"
                        styles={ selectNoBorderStyles }
                        value={ {value: difficulty, label: difficulty.toString() }  }
                        options={ range(1, MAX_DIFFICULTY+1).map((i) => ({value: i, label: (i).toString()})) }
                        onChange={ (newOption: any) => 
                            setDifficulty(newOption.value)}
                    />
                    <label className="input-group-text" >out of 10</label>
                </div>

                {/* time to complete */}
                <div className="input-group">
                    <label className="input-group-text" htmlFor="date-open">Time to complete:</label>
                    <Select
                        components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                        className="form-control"
                        styles={ selectNoBorderStyles }
                        value={ {value: timeToComplete_h, label: timeToComplete_h.toString() }  }
                        options={ range(0, MAX_HOURS_TO_COMPLETE+1).map((i) => ({value: i, label: (i).toString()})) }
                        onChange={ (newOption: any) => 
                            setTimeToComplete_h(newOption.value)}
                    />
                    <label className="input-group-text" >hours</label>

                    <Select
                        components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                        className="form-control"
                        styles={ selectNoBorderStyles }
                        value={ {value: timeToComplete_m, label: timeToComplete_m.toString() }  }
                        options={ range(0, MAX_MINUTES_TO_COMPLETE+1, 10).map((i) => ({value: i, label: (i).toString()})) }
                        onChange={ (newOption: any) => 
                            setTimeToComplete_m(newOption.value)}
                    />
                    <label className="input-group-text" >minutes</label>
                </div>


            </div>
        </Fragment>
    )
}

export default MotoRouteEditorDetailsTab;