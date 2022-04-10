import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Post from "components/Post";
import PostFactory from "components/PostFactory";

const Home = (props) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    dbService.collection("posts").onSnapshot((snapshot) => {
      const postArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postArray);
    });
  }, []);
  return (
    <div className="container">
      <PostFactory userObj={props.userObj} />
      <div style={{ marginTop: 30 }}>
        {posts.map((post) => (
          <Post
            key={post.id}
            postObj={post}
            isOwner={post.creatorId === props.userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
