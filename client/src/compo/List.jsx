import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import "./List.css";
import Axios from "axios";
import { Button } from "@mui/material";
import axios from "axios";


const fetch1 = () => {
    const response = Axios({
      method: "GET",
      url: "http://json-heroku-shubham.herokuapp.com/todo",
    });
    return response;
  };


  const updateData = async (itm) => {
    await axios({
      method: "PATCH",
      url: `http://json-heroku-shubham.herokuapp.com/todo/${itm.id}`,
      data: {
        ...itm
      },
    });
  };

  const deleteData = async (itm) => {
    await axios({
      method: "DELETE",
      url: `http://json-heroku-shubham.herokuapp.com/todo/${itm.id}`,
    });
  };





function List() {


  const { data, error, isError, isLoading } = useQuery(["GetData"], fetch1);
  const { status, mutate } = useMutation(updateData);
  const { status: DeleteData, mutate: MutateDelete } = useMutation(deleteData);
  console.log(data);

 
  const handleUpdate = (id, title, status) => {
    mutate({
      id: id,
      title: title,
      status: !status,
    });
  };


const handleDelete = (id) => {
    console.log(id)
    MutateDelete({
         id:id,
      });
}
 

  return (
    <ul>
      {data?.data.map((itm) => (
        <div className="list_item" key={itm.id} id={itm.id}>
          <p>{itm.title}</p>
          <Button
            variant="contained"
            color="secondary"
            style={{ backgroundColor: "peru" }}
            onClick={() => handleUpdate(itm.id, itm.title, itm.status)}
          >
            {itm.status ? "UNDONE" : "DONE"}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            style={{ backgroundColor: "purple" }}
            onClick={() => handleDelete(itm.id)}
          >
            DELETE
          </Button>
        </div>
      ))}
    </ul>
  );
}

export default List;

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await Axios({
//         method: "GET",
//         url: "http://json-heroku-shubham.herokuapp.com/todo",
//       });
//       return response;
//     };

//     const out = fetchData()
//       .then((res) => {
//         setListTodo(res.data);
//         console.log(res.data);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   }, [nUpdate]);

// listTodo.length <= 0 ? (
//     <div>
//       <h2>Loading...</h2>
//     </div>
//   ) : (
//     <div className="list">
//       {listTodo.length > 0 &&
//         listTodo.map((itm) => (
//           <div className="list_item" key={itm.id} id={itm.id}>
//             <p>{itm.title}</p>
//             <Button
//               variant="contained"
//               color="secondary"
//               style={{ backgroundColor: "peru" }}
//               onClick={() => handleUpdate(itm.id, itm.status)}
//             >
//               {itm.status ? "UNDONE" : "DONE"}
//             </Button>
//             <Button
//               variant="contained"
//               color="secondary"
//               style={{ backgroundColor: "purple" }}
//               onClick={() => handleDelete(itm.id)}
//             >
//               DELETE
//             </Button>
//           </div>
//         ))}
//     </div>
//   );
