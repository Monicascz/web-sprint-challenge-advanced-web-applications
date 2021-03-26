import React, { useState,} from "react";
import axios from "axios";
import {axiosWithAuth} from '../helpers/axiosWithAuth'

// import {useParams} from 'react-router-dom'

import Color from './Color'
import EditMenu from './EditMenu'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  // const {id} = useParams();

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  

  // console.log("COLORS",colors)
  // console.log("COLORS ID", id)
  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(`/colors/${colorToEdit.id}`, colorToEdit)
    .then((resp)=>{
        updateColors([...colors, colorToEdit]);
        setEditing(false)
    })
    .catch((err)=>{
      console.log("Error ColorList:", err.response)
    })

  };

  const deleteColor = color => {
    axiosWithAuth()
    .delete(`/colors/${colorToEdit.id}`)
    .then((res) => {
      updateColors(colors.filter(item => item.id !== color.id))
      setEditing(false)
    })
    .catch((err) => {
      console.log(err.response);
    });
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => <Color key={color.id} editing={editing} color={color} editColor={editColor} deleteColor={deleteColor}/>)}
      </ul>
      
      { editing && <EditMenu colorToEdit={colorToEdit} saveEdit={saveEdit} setColorToEdit={setColorToEdit} setEditing={setEditing}/> }

    </div>
  );
};

export default ColorList;

//Task List:
//1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
//2. Complete the deleteColor functions by making a delete request for deleting colors.