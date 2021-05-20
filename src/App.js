import useSubReddits,{useSubReddit} from "./useSubreddits";
import usePosts,{usePost} from "./usePosts";
import useComments from "./useComments";
import "./App.css";
import Card, {PostCard,CommentCard} from "./components/card/card";
import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import React from "react";


function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <div className="header-right">
            <Link to="/">Home</Link>
          </div>
        </header>

        <Switch>
          <Route path="/subredits/:id/posts/:postId">
            <PostPage />
          </Route>
          <Route path="/subredits/:id/">
            <Posts />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  const subRedits = useSubReddits(1,10);
  
  return (
    <div>
      <h2>Home</h2>
      <div className="container row">
        {subRedits.map((elem) => (
          <Link key={elem.id}
            to={"/subredits/" + elem.id + "/"}
            className="col col-3 no-link"
           
          >
            <Card item={elem} />
          </Link>
        ))}
      </div>

    </div>
  );

}
const sortOptions = [
  'ID', 'Name', 'Desc'
];

function Posts() {
  let { id } = useParams();
  const subReddit=useSubReddit(id);
  const posts = usePosts(id,1,10);
  const [sortBy, setSortBy] = useState(0);


  React.useEffect(()=>{

  },[id,sortBy])
  const sortByFunc=(elem,sortBy)=>{
    switch(sortBy){
      case 0:return elem.id
      break;
      case 1:return elem.user
      break;
      case 2:return elem.body
      break;
    }
  }
  const SortedList=({sortBy})=>{
    console.log("render")
    console.log(sortByFunc(posts[0],sortBy))
    return(posts.sort(elem=>sortByFunc(elem,sortBy)).map((elem) => (
      <div
      key={elem.id}
        style={{
          width: "100%",
          paddingBottom: 10,
          alignContent: "center",
        }}
      >
        <Link
          to={
            "/subredits/" + elem.subredditId + "/posts/" + elem.id + "/"
          }
          class="col col-3 no-link"
        >
          <PostCard item={elem} />
        </Link>
      </div>
    )))
  }

  return (
    <div style={{flex:1}}>
      <h2>Redit {id}</h2>
      <div className="container row">
        <div className="col">
          <div className="sortContainer">
          <Dropdown options={sortOptions} 
          onChange={(option)=>{console.log(sortBy)
            setSortBy(sortOptions.indexOf(option.value))}} 
          value={sortOptions[sortBy]} 
          placeholder="Select an option" />
          </div>
        <SortedList sortBy={sortBy}/>
        </div>
        <div className="col" style={{ padding: 20 }}>
          <Card item={subReddit} />
        </div>
      </div>
    </div>
  );
}

function PostPage() {
  let { id,postId} = useParams();
  const post = usePost(id, postId);
  const comments = useComments(id,postId,1,10);
  return (
    <div className="container row" style={{ margin: 10 }}>
      <div className="col" style={{ marginTop: 90 }}>
        {comments.map((elem) => (
          <div
    
            style={{ width: "100%", paddingBottom: 10, alignContent: "center" }}
          >
            <CommentCard item={elem} />
          </div>
        ))}
      </div>
      <div className="col" style={{ padding: 30 }}>
        <PostCard item={post} />
      </div>
    </div>
  );
}
export default App;
