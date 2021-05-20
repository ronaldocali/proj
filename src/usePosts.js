import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
export default function usePosts(id,page,max) {
    const [posts, setPosts] = useState([]);
      const dispatch = useDispatch();
      const reduxPosts = useSelector((state) => state.posts);
    useEffect(() => {
      console.log(reduxPosts);
      if (reduxPosts.filter((el) => ""+el.subredditId==""+id).length < 1) {
                fetch(
                  "https://6040c786f34cf600173c8cb7.mockapi.io/subreddits/" +
                    id +
                    "/posts?page=" +
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
                    dispatch({ type: "ADD_TO_POSTS", value: jsonData });
                    setPosts(jsonData);
                    
                    return jsonData;
                  });
      }else{
        setPosts(reduxPosts.filter((el) => el.subredditId == id));
        return reduxPosts.filter((el) => el.subredditId == id);
      }

    },[]);
  
    return posts;
  }
  export function usePost(id,postId) {
    const [post, setPost] = useState({});
  const reduxPosts = useSelector((state) => state.posts);
    useEffect(() => {
      const post=reduxPosts.find(elem=>elem.id=postId)
      if (!post){
                fetch(
                  "https://6040c786f34cf600173c8cb7.mockapi.io/subreddits/" +
                    id +
                    "/posts/" +
                    postId +
                    "/",
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
                    setPost(jsonData);
                    return jsonData;
                  });
      }else{
        setPost(post);
        return post;
      }

    },[id,postId]);
  
    return post;
  }