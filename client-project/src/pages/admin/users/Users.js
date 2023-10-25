import { Tab, Button } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import "./Users.scss";
import ListUsers from "../../../components/Admin/Users/UsersManagement";
import { Dialog } from "@mui/material";

const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [listUsersKey, setListUsersKey] = useState(0); // Estado para la clave

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleTabChange = () => {
    // Cambia la clave para forzar la recarga de ListUsers
    setListUsersKey(listUsersKey + 1);
  };

  const panes = [
    { menuItem: 'Activos', render: () => <Tab.Pane><ListUsers key={listUsersKey} usersActive={true} /></Tab.Pane> },
    { menuItem: 'Inactivos', render: () => <Tab.Pane><ListUsers key={listUsersKey} usersActive={false} /></Tab.Pane> },
  ];

  return (
    <div className="main-cont">
      <h2>Usuarios</h2>
      <div className="users-page" style={{ gap: 10, marginBottom: 10 }}>
        <div className="title-section">
          <Button className="add-user-btn" color="primary" onClick={handleOpenModal}>
            Nuevo usuario
          </Button>
        </div>
        <div className="list-users-table ui pointing menu">
          <Tab panes={panes} onTabChange={handleTabChange} menu={{ pointing: true }}/>
        </div>
      </div>
      <Dialog></Dialog>
    </div>
  );
};


export default Users;
