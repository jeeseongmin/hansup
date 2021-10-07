import React from 'react'
import HomeButton from 'components/button/HomeButton'

const HomeContent = ({image, title, text, color, reverse}) => {

    return (
        <div class="mb-16 py-20 h-96 relative">            
            <div class={ `flex ${ reverse === 'true' ? 'flex-row-reverse' : '' } bg-${color} ` } >
                <div class="flex-col w-1/2 py-14 px-40">
                    <h2 class="text-3xl text-hansupBrown my-4">{title}</h2>
                    <p class="my-6">  {text} </p>
                    <div class="relative pb-4">
                        <div class="absolute top-10 w-96">
                            <HomeButton text="자세히 보기" />   
                        </div>
                    </div>                    
                </div>    
                <div class= {`w-1/2 pl-28 absolute ${ reverse === 'true' ? 'left-0' : 'right-0' } top-8`} >
                    <img class="h-96 object-cover" src={image} alt="food" />
                </div>                             
            </div>            
        </div>
    )
}

export default HomeContent
