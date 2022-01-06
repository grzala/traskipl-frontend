import React, { Fragment, useCallback, useMemo, useState } from "react"

// Datepicker Range
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker,DateRangePickerProps } from 'react-date-range';

import moment from "moment";
import Select from 'react-select';

import "./MotoRouteEditor.scss"
import { BorderWidth } from "react-bootstrap-icons";

// t.string "name"
// t.string "description"
// t.date "open_start"
// t.date "open_end"
// t.integer "time_to_complete_h"
// t.integer "time_to_complete_m"
// t.integer "difficulty"

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

const MAX_DESCRIPTION_LENGTH = 400;

const MotoRouteEditorDetails = () => {

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



    const dateSelectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }

    const handleSelectDates = (ranges: DateRangePickerProps) => {
        console.log(ranges);
    }


    // Date start and date and
    const selectNoBorderStyles = {
        control: (styles: any, state: any) => ({ 
            ...styles, 
            border: 'none',
            boxShadow: 'none' // disable blue outline on focus
        }),
    }

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

    return (
        <Fragment>
            <div className="moto-route-editor-details-container">
                <h3>Route Details</h3>

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

                <div className="form-group">
                    <label htmlFor="name">Description:</label>
                    <textarea 
                        className={ `loginbox-form-control form-control ${ fieldErrs.description ? "invalid" : "" }` }
                        name="description" 
                        placeholder="Route description" 
                        value={ motoRouteDetailsData.description } 
                        onChange={ handleChange } 
                        maxLength={ MAX_DESCRIPTION_LENGTH }
                    />
                    <small>Characters left: {descriptionCharactersLeft}</small>
                </div>

                <div className="time-data-container">

                    <div className="open-all-year-container input-group">
                        <input 
                            type="checkbox" 
                            name="is_open_full_year"
                            checked={ openAllYear }
                            onChange={() => setOpenAllYear(!openAllYear)} />
                        <label htmlFor="is_open_full_year">&nbsp;&nbsp;Open all year</label>
                    </div>

                    { openAllYear && (
                        <Fragment>
                            <div className="input-group">
                                <label className="input-group-text" htmlFor="date-open">Open from:</label>
                                <Select
                                    className="form-control"
                                    value={ openFrom.day }
                                    options={ getDaysInMonth(openFrom.month.value) }
                                    styles={ selectNoBorderStyles }
                                    onChange={ (newOption: any) => 
                                        setOpenFrom({...openFrom, day: newOption})}
                                />

                                <Select
                                    className="form-control"
                                    value={ openFrom.month }
                                    options={ allMonths }
                                    styles={ selectNoBorderStyles }
                                    onChange={ (newOption) => handleMonthChange(newOption, openFrom, setOpenFrom) }
                                />
                            </div>

                            <div className="input-group">
                                <label className="input-group-text" htmlFor="date-open">Open to:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                <Select
                                    className="form-control"
                                    value={ openTo.day }
                                    options={ getDaysInMonth(openTo.month.value) }
                                    styles={ selectNoBorderStyles }
                                    onChange={ (newOption: any) => 
                                        setOpenTo({...openTo, day: newOption})}
                                />

                                <Select
                                    className="form-control"
                                    value={ openTo.month }
                                    options={ allMonths }
                                    styles={ selectNoBorderStyles }
                                    onChange={ (newOption) => handleMonthChange(newOption, openTo, setOpenTo) }
                                />
                            </div>
                        </Fragment>
                    )}
                </div>
            </div>


        </Fragment>
    )
}

export default MotoRouteEditorDetails;