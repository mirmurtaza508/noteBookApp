import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  //  const   s1={
  //         "name":"mir murtaza",
  //         "class":"10th"
  //     }
  //     const [state, setState] = useState(s1)
  //    const update  = ()=>{
  //         setTimeout(() => {
  //             setState({
  //                 "name":"arif",
  //                 "class":"12th"
  //             })
  //         }, 1000);
  //     }
  const notesInitial = [];
  const [notes, setnotes] = useState(notesInitial);

  //get all Notes
  const getNotes = async () => {
    //API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      // body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json();
    // console.log(json);
    setnotes(json);

    // const json =  response.json();
    //   console.log("Adding a new note")
    //  const  note =     {
    //     "_id": "65ed7e4c1a30afe3767dff74b",
    //     "user": "65e9978ef9020a33d431b02120",
    //     "title": title,
    //     "description": description,
    //     "tag": tag,
    //     "date": "2024-03-10T09:33:00.684Z",
    //     "__v": 0
    //   }
    //   setnotes(notes.concat(note))
  };

  //Add a Note
  const addNote = async (title, description, tag) => {
    //todo: api call
    //API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setnotes(notes.concat(note));

    // console.log(json)
    // console.log("Adding a new note");
    // const note = {
    //   _id: "65ed7e4c1a30afe3767dff74b",
    //   user: "65e9978ef9020a33d431b02120",
    //   title: title,
    //   description: description,
    //   tag: tag,
    //   date: "2024-03-10T09:33:00.684Z",
    //   __v: 0,
    // };
  };
  //Delete a Note
  const deleteNote = async (id) => {
    //API CALL
    const response = await fetch(`${host}/api/notes//deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      // body: JSON.stringify(title, description, tag),
    });
    const json = await response.json();
    console.log(json);
    console.log("deleting the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNotes);
  };
  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    let newNotes = JSON.parse(JSON.stringify(notes));
    //Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
