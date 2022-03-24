import React, { useState, useEffect } from "react";
import { dbService } from "fbase";

const Home = (props) => {
  const [post, setPost] = useState("");
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
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("posts").add({
      text: post,
      createdAt: Date.now(),
      creatorId: props.userObj.uid,
    });
    setPost("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setPost(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={post}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Post" />
      </form>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h4>{post.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
