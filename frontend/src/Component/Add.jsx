import axios from 'axios';
import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

function Add() {
  const [todolist, setToDo]= useState('')

   const addToDo=async(event)=>{
    event.preventDefault();
        const body={todolist}
        console.log(body);
        
        try{
            const result=await axios.post('http://localhost:8080/addToDo',body)
            console.log(result)
            alert(result.data.message)
            window.location.reload()
        }
        catch(error){
            console.log(error)
        }
      }
  
  return (
    <div>
      <Form>
      
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Text:</Form.Label>
        <Form.Control as="textarea" onChange={(event)=>setToDo(event.target.value)}  placeholder="Enter here" rows={3} />
      </Form.Group>
      <Button variant="info" type="submit" onClick={((event)=>(addToDo(event)))}>Submit</Button>
    </Form> 
    </div>
  )
}

export default Add

