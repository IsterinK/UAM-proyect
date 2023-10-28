import { Tab } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
import "./Users.scss";
import ListUsers from "../../../components/Admin/Users/UsersManagement";
import { BasicModal } from "../../../components/Shared/BasicModal";
import { Button } from "@mui/material";
import { Auth } from "../../../api/index";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/surfaces/NavBar";

const Users = () => {
  const navigate = useNavigate();
  const auth = new Auth();
  const [showModal, setShowModal] = useState(false);
  const [listUsersKey, setListUsersKey] = useState(0);
  const [reloadTable, setReloadTable] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setReloadTable(true);
  };

  const handleTabChange = () => {
    // Cambia la clave para forzar la recarga de ListUsers
    setListUsersKey(listUsersKey + 1);
  };

  const panes = [
    { menuItem: 'Activos', render: () => <Tab.Pane><ListUsers key={listUsersKey} usersActive={true} reloadTable={reloadTable} /></Tab.Pane> },
    { menuItem: 'Inactivos', render: () => <Tab.Pane><ListUsers key={listUsersKey} usersActive={false} reloadTable={reloadTable} /></Tab.Pane> },
  ];

  useEffect(() => {
    if ( auth.getAccessToken === null) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (reloadTable) {
      setReloadTable(false); // Restablece el estado
      setListUsersKey(listUsersKey + 1); // Cambia la clave para forzar la recarga
    }
  }, [reloadTable]);

  return (
    <div className="main-cont">
      <div className="App-header">
        <Navbar></Navbar>
      </div>
      <p className="title">Usuarios</p>
      <Button className="add-user-btn" variant="contained" color="success" onClick={handleOpenModal}>
        Nuevo usuario
      </Button>
      <div className="users-page">
        <div className="list-users-table ui pointing menu">
          <Tab panes={panes} onTabChange={handleTabChange} menu={{ pointing: true }} />
        </div>
      </div>
      {showModal && (
        <BasicModal handleCloseModal={handleCloseModal}></BasicModal>
      )}
    </div>
  );
};

export default Users;
