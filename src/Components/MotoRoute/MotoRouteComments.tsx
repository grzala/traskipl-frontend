import React from "react";

const MotoRouteComments = () => {

    
    return (
        <div className="list-group">
            <div
                className="list-group-item list-group-item-action flex-column align-items-start active">
                Comments
            </div>
            <a href="/#" className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">List group item heading</h5>
                    <small className="text-muted">3 d1ays ago</small>
                </div>
                <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                <small className="text-muted">Donec id elit non mi porta.</small>
            </a>
            <a href="/#" className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">List group item heading</h5>
                    <small className="text-muted">3 days ago</small>
                </div>
                <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                <small className="text-muted">Donec id elit non mi porta.</small>
            </a>
        </div>
    )
}

export default MotoRouteComments;