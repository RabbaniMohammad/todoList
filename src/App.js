import React, { useState, useEffect } from "react";
function App() {
  const [val, setVal] = useState("");
  const [word, setWord] = useState([
    ...JSON.parse(localStorage.getItem("todoList")),
  ]);
  const [id, setId] = useState("");
  const addLetter = (lett) => {
    setVal(lett.target.value);
  };
  const addWord = (e) => {
    e.preventDefault();
    const newWordList = word.filter((ele) => ele.id !== id);

    if (val)
      setWord([
        ...newWordList,
        { name: val, id: new Date().getTime().toString() },
      ]);
    setVal("");
  };
  const deleteWord = () => {
    word.pop();
    setWord([...word]);
  };
  const deleteAll = () => {
    setWord([]);
  };
  const deleteThis = (id) => {
    const getWord = word.filter((ele) => ele.id !== id);
    setWord([...getWord]);
  };
  const editThis = (id) => {
    const getItem = word.find((ele) => ele.id === id);
    setId(id);
    setVal(getItem.name);
  };
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(word));
  }, [word]);

  return (
    <div>
      <form>
        <input type="text" onChange={(e) => addLetter(e)} value={val} />
        <input type="submit" onClick={(e) => addWord(e)} value="Add" />
        <input type="button" onClick={deleteWord} value="Delete" />
        <input type="button" onClick={deleteAll} value="Delete All" />
        {word.map((ele) => {
          return (
            <div>
              <p>{ele.name}</p>
              <input
                type="button"
                value="edit"
                onClick={() => editThis(ele.id)}
              />
              <input
                type="button"
                value="Delete"
                onClick={() => deleteThis(ele.id)}
              />
            </div>
          );
        })}
      </form>
    </div>
  );
}

export default App;
