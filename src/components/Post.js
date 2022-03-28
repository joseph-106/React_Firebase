import React, { useState } from "react";
import { dbService } from "fbase";

const Post = (props) => {
  const [editing, setEditing] = useState(false);
  const [newPost, setNewPost] = useState(props.postObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("정말 삭제할까용?");
    if (ok) {
      await dbService.doc(`posts/${props.postObj.id}`).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`posts/${props.postObj.id}`).update({ text: newPost });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewPost(value);
  };
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              value={newPost}
              onChange={onChange}
              type="text"
              placeholder="Edit your post"
              required
            />
            <input type="submit" value="Update" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{props.postObj.text}</h4>
          {props.isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Post</button>
              <button onClick={toggleEditing}>Update Post</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Post;
