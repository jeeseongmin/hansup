import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const HomeButton = ({text}) => {

    return (
        <div class='py-6 px-8 mb-3 w-full relative text-white font-bold bg-opacity-80 bg-hansupBrown hover:bg-white hover:text-hansupBrown'>            
            {text}
            <div class="absolute top-7 right-10">
                <FontAwesomeIcon icon={faArrowRight} className="float-right" />                                                             
            </div>                                            
        </div>
    )
}

export default HomeButton
