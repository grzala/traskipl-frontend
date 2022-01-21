import React, { Fragment, useEffect, useState } from 'react'
import { Search } from 'react-bootstrap-icons'
import Pagination from 'react-js-pagination'
import { useMatch, useNavigate } from 'react-router-dom'
import { useSearchMotoRoute } from 'src/Actions/MotoRoutesActions'
import MotoRoutesList from 'src/Components/MotoRoute/MotoRoutesList'


const ROUTES_PER_PAGE = 10

const SearchPage = () => {
    const [searchString, setSearchString] = useState<string>("")
    const [inputString, setInputString] = useState<string>("")
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [motoRouteList, isLoadingMotoRoutes, loadedOnce, totalRoutes] = useSearchMotoRoute(searchString, currentPage)
    const urlMatch = useMatch('/search/:page')
    const navigate = useNavigate()

    useEffect(() => {
        if (urlMatch === null) {
            navigate("/")
            return
        }

        let new_page = Number(urlMatch.params.page)
        // Do this if no page provided or wrong page provided
        if (new_page === undefined || isNaN(new_page) || new_page < 0) {
            navigate(`/search/1`)
            return
        }

        setCurrentPage(new_page)
    }, [urlMatch, navigate])

    
    const onChangePage = (new_page: number) => {
        navigate(`/search/${new_page}`)
    }


    useEffect(() => {
        const timer = setInterval(() => {
            runSearch()
        }, 800);
      
        return () => clearInterval(timer);
    });

    const runSearch = () => {
        setSearchString(inputString)
    }

    return (
        <Fragment>
            <h2>Search Rotues:</h2>
            <div className="input-group">
                <input 
                    type="text" 
                    className="form-control" 
                    value={inputString}
                    onChange={(e) => setInputString(e.target.value)}
                    onKeyUp={(e) => {if (e.code === "Enter") runSearch()} }
                />
                <div className="input-group-append" style={{ cursor: "pointer" }} onClick={() => runSearch()}>
                    <div className="input-group-text" style={{ minHeight: "3em" }}>
                        <Search />
                    </div>
                </div>
            </div>

            <h5>Results: 0</h5>

            <div className="SearchResults">

                {(loadedOnce || !isLoadingMotoRoutes) && motoRouteList.length > 0 && (
                    <Fragment>
                        <MotoRoutesList title={"Seach results"} routes={motoRouteList} isLoading={!loadedOnce && isLoadingMotoRoutes} />
                        
                        <div style={{
                            margin: "0.8em 0",
                            width: "100%"
                        }}>
                            <Pagination
                                innerClass="pagination pagination-center"
                                itemClass="page-item"
                                linkClass="page-link"            
                                activePage={Math.min(currentPage, Math.ceil(totalRoutes / ROUTES_PER_PAGE))}
                                itemsCountPerPage={ROUTES_PER_PAGE}
                                totalItemsCount={totalRoutes}
                                pageRangeDisplayed={5}
                                onChange={onChangePage}
                            />
                        </div>
                    </Fragment>
                )}
            </div>

        </Fragment>
    )
}

export default SearchPage