import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Post = (props) => {
  const [editing, setEditing] = useState(false);
  const [newPost, setNewPost] = useState(props.postObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("정말 삭제할까용?");
    if (ok) {
      await dbService.doc(`posts/${props.postObj.id}`).delete();
      await storageService.refFromURL(props.postObj.attachmentUrl).delete();
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
    <div className="post">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container postEdit">
            <input
              value={newPost}
              onChange={onChange}
              type="text"
              placeholder="Edit your post"
              required
              autoFocus
              className="formInput"
            />
            <input type="submit" value="Update" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{props.postObj.text}</h4>
          {props.postObj.attachmentUrl && (
            <img alt="postImage" src={props.postObj.attachmentUrl} />
          )}
          {props.isOwner && (
            <div className="post__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Post;
