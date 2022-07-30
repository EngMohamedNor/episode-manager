import Modal from "../Modal";
import { useState } from "react";
import "../index.css";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

function AddTask({ onClose, open, categories }) {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [category_id, setCategoryid] = useState("");
  const [category_name, setCategoryname] = useState("");
  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, `categories/${category_id}/playlists`), {
        name: name,
        description: description,
        author: author,
        created: Timestamp.now(),
        category_name: category_name,
      });
      onClose();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Modal modalLable="Add Playlist" onClose={onClose} open={open}>
      <form onSubmit={handleSubmit} className="addTask" name="addTask">
        <select
          onChange={(e) => {
            setCategoryid(e.target.value);
            setCategoryname(e.target.options[e.target.selectedIndex].text);
          }}
        >
          <option value="">Select Category</option>
          {categories.map((c) => {
            return <option value={c.id}>{c.name}</option>;
          })}
        </select>
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value.toUpperCase())}
          value={name}
          placeholder="Enter Name"
        />{" "}
        <input
          type="text"
          name="author"
          onChange={(e) => setAuthor(e.target.value.toUpperCase())}
          value={author}
          placeholder="Enter Author Name"
        />
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter  decription"
          value={description}
        ></textarea>
        <button type="submit">Done</button>
      </form>
    </Modal>
  );
}

export default AddTask;
