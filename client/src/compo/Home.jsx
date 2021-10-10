import React, {useState} from "react";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import List from "./List";
import Axios from "axios"




const handleSubmit = async(todo) => {
  await Axios.post(`http://json-heroku-shubham.herokuapp.com/todo/`, todo)
}


 
function Home() {

  const queryClient =  useQueryClient();

    const [todo, setTodo] = useState("")
    const {status, mutate} = useMutation(handleSubmit, {
      onSuccess: () => {
        queryClient.invalidateQueries("GetData")
        setTodo("")
      }
    });
  

  return (
    <div>
      <br />
      <TextField
        id="outlined-basic"
        label="Type To Do Here"
        variant="outlined"
        type="text"
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
