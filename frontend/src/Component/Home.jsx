import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { MdDelete } from "react-icons/md";

function Home() {
  const [todo, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/getalltodos');
      console.log(data);
      setData(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const result = await axios.delete(`http://localhost:8080/deleteTodo/${id}`);
      console.log(result);
      alert(result.data.message);
      fetchData(); 
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  const updateTodo = async (id, completed) => {
  try {
    const result = await axios.post(`http://localhost:8080/updatetodo/${id}`, { completed });
    console.log(result);
    alert(result.data.message);
    fetchData(); 
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='container-fluid d-flex justify-content-center mt-5'>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>To Do</th>
            <td></td>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
  {
    todo.map((item, index) => (
      <tr key={item._id}>
        <td>{index + 1}</td>
        <td style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
          {item.todo}
        </td>
        <td>
          <input 
            type="checkbox" 
            checked={item.completed} 
            onChange={(e) => updateTodo(item._id, e.target.checked)} 
            style={{ cursor:"pointer" }}
          />
        </td>
        <td>
          <Button onClick={() => deleteTodo(item._id)} className='bg-info'>
            <MdDelete /> Delete
          </Button>
        </td>
      </tr>
    ))
  }
</tbody>

      </Table>
    </div>
  );
}

export default Home;
