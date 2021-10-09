import React, {useState} from "react";
import { useMutation } from "react-query";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import List from "./List";
import Axios from "axios"




const handleSubmit = async(todo) => {
  await Axios.post(`http://json-heroku-shubham.herokuapp.com/todo/`, todo)
}



function Home() {

    const [todo, setTodo] = useState("")
    const {status, mutate} = useMutation(handleSubmit)
  
    console.log(status)


  return (
    <div>
      <br />
      <TextField
        id="outlined-basic"
        label="Type To Do Here"
        variant="outlined"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <br />
      <br />
      <Button variant="contained" color="secondary" onClick={() => mutate({
        title: todo,
        status: false
      })}>
        Submit
      </Button>
      <List/>
    </div>
  );
}

export default Home;
