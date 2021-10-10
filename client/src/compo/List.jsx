import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import "./List.css";
import Axios from "axios";
import { Button } from "@mui/material";
import axios from "axios";

const fetch1 = async () => {
  const response = await Axios({
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
      ...itm,
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
  const queryClient = useQueryClient();

  const { data, status: GetData } = useQuery("GetData", fetch1);
  const { status, mutate } = useMutation(updateData, {
    onSuccess: () => {
      queryClient.invalidateQueries("GetData");
    },
  });
  const { status: DeleteData, mutate: MutateDelete } = useMutation(deleteData, {
    onSuccess: () => {
      queryClient.invalidateQueries("GetData");
    },
  });
  console.log(data?.data);

  const handleUpdate = (id, title, status) => {
    mutate({
      id: id,
      title: title,
      status: !status,
    });
    console.log(data?.data);
  };

  const handleDelete = (id) => {
    console.log(id);
    MutateDelete({
      id: id,
    });
  };

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
