import React from 'react'
import { Link } from 'react-router-dom'
import './SingleCard.css'

function SingleCard(props) {
    return (
        <Link className="textText" to= {'/uniquelisting/' + props.link}
        >
        <div class = "cardContainer">
            <div class ="card shadow">
            <div class = "thumbnail">
                <img src={props.src}/>
            </div>
            <div class = "card-content text-center ">
                <a><i class="fa fa-tags" aria-hidden="true"></i>   ${props.price}</a>
                <p>{props.content}</p>
            </div>
            </div>
        </div>
        </Link>
    
    );
}
export default SingleCard