import { useState, useEffect } from 'react';
import "./card.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp,faArrowDown } from '@fortawesome/free-solid-svg-icons'
export default function Card({item}){
     return(
         
        
         <div className="card">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="row">
            <div className="col"></div><p className="author col"> Admin: {item.admin}</p>
            </div>
            
         </div>
    

     )
}
export function PostCard({item}){
    return(
        <div className="card">
                    <div className="row" style={{alignItems:"flex-start"}}>
            <div className="col" style={{maxWidth:50}}>
                <div> <FontAwesomeIcon icon={faArrowUp} /></div>
           
                <div>{item.id}</div>
            <FontAwesomeIcon icon={faArrowDown} />
            </div>
                <div className="col">
           <h3>{item.title}</h3>
           <img className="img" src={item.image}/>
           <p>{item.body}</p>
           <div className="row">
           <div className="col"></div><p className="author col">Posted from {item.user}</p>
           </div>
           </div>
           </div>
        </div>
   

    )
}

export function CommentCard({item}){
    return(
        <div className="card" style={{flex:1}}>
            <div className="row" style={{alignItems:"flex-start"}}>
            <div className="col" style={{maxWidth:50}}>
                <div> <FontAwesomeIcon icon={faArrowUp} /></div>
           
                <div>{item.id}</div>
            <FontAwesomeIcon icon={faArrowDown} />
            </div>
                <div className="col">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <div className="row">
                <div className="col"></div><p className="author col">Comment from {item.name}</p>
                </div>
                </div>
            </div>

           
        </div>
   

    )
}