

import React, {useState} from "react";
import "./../styles/App.css";
import ToDoItem from "./todo";

function App() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);
  const [display, setDisplay] = useState([]);

  let keyCount = 1;

  function handleChange(event) {
    let text = event.target.value;
    setInputText(text);
  }

  function addItem() {
    if (inputText.length === 0) return;

    setItems((prevItems) => {
      return [...prevItems, inputText];
    });

    let arr = [...display];

    arr.push(false);
    setDisplay(arr);

    setInputText("");
    //console.log("check add");
  }

  function deleteItem(id) {
    setItems((prevItems) => {
      return prevItems.filter((el, index) => {
        return index !== id;
      });
    });

    let arr = [...display];
    arr.splice(id, 1);
    setDisplay(arr);

  }
  const [editableText, setEditableText] = useState("");

  function handleEdit(id) {
    

    let arr = [...display];
    arr[id] = true;
    setDisplay(arr);
  }

  function onEditText(event) {
    setEditableText(event.target.value);
  }

  function onEditSave(id) {
    let arr = [...display];
    arr[id] = false;
    setDisplay(arr);

    let textArr = [...items];
    textArr[id] = editableText;

    setItems(textArr);
  }
  return (
    <div id="main">
      <input id="task" type="text" onChange={handleChange} value={inputText} />
      <button id="btn" onClick={addItem}>
        Add
      </button>

      <div>
        <ul>
          {items.map((el, index) => (
            <ToDoItem
              onDelete={deleteItem}
              key={keyCount++}
              id={index}
              item={el}
              onEdit={handleEdit}
              onShow={display[index]}
              onEditText={onEditText}
              onEditSave={onEditSave}
              checkSaveButton={editableText}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;