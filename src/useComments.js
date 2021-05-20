import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
export default function useComments(subRedit,post,page,max) {
    const [comments, setComments] = useState([]);
        const dispatch = useDispatch();
        const reduxComments = useSelector((state) => state.comments);
    useEffect(() => {
      if (reduxComments.filter((el) => el.postId == post).length < 1) {
        fetch(
          "https://6040c786f34cf600173c8cb7.mockapi.io/subreddits/" +
            subRedit +
            "/posts/" +
            post +
            "/comments",
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
            setComments(jsonData);
            dispatch({ type: "SET_COMMENTS", value: jsonData });
            return jsonData;
          });
      } else {
        setComments(reduxComments);
        return reduxComments;
      }
    },[subRedit,post,page,max]);
  
    return comments;
  }