import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
export default function useSubReddits(page,max) {
    const [subRedits, setSubRedits] = useState([]);
    const dispatch = useDispatch();
    const reduxSubRedits = useSelector((state) => state.reddits);
    useEffect(() => {
      console.log(reduxSubRedits.length);
      if (reduxSubRedits.length<1){
        fetch(
          "https://6040c786f34cf600173c8cb7.mockapi.io/subreddits?page=" +
            page +
            "&limit=" +
            max,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
          .then(function (response) {
            // console.log(response)
            return response.json();
          })
          .then(function (jsonData) {
            console.log(jsonData);
            setSubRedits(jsonData);
            dispatch({ type: "SET_REDDITS", value: jsonData });
            return jsonData;
          });
      }else{
        setSubRedits(reduxSubRedits);
        return reduxSubRedits;

      }

    },[page,max]);
  
    return subRedits;
  }
  export  function useSubReddit(id) {
    const [subRedit, setSubRedit] = useState({});
    const reduxSubRedits = useSelector((state) => state.reddits);
    useEffect(() => {
      const redit=reduxSubRedits.find(elem=>elem.id=id)
      if (!redit){
        fetch("https://6040c786f34cf600173c8cb7.mockapi.io/subreddits/"+id+"/",{
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
          }
          )
            .then(function(response){
             // console.log(response)
              return response.json();
            })
            .then(function(jsonData) {
              console.log(jsonData);
              setSubRedit(jsonData);
              return jsonData;
            }
        )}else{
          setSubRedit(redit)
          return redit;
        }
    },[id]);
  
    return subRedit;
  }