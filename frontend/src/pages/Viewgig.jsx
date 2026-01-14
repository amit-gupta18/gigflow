import React from 'react'
import { useParams } from 'react-router-dom'

function Viewgig() {
    const {id} = useParams();
    return (
        <div>
            {/* // id passed in url . */}
            Viewgig : {id}
        </div>
    )
}

export default Viewgig