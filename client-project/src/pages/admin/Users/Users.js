import { Tab, Button } from "semantic-ui-react";
import React, { useEffect, useState } from "react";
/* import "./Users.scss"; */
import { BasicModal } from "../../../components/Shared/BasicModal";
import ListUsers from "../../../components/Admin/Users/UsersList/UsersList";
/* import UserForm from "../../../components/Admin/Users/UserForm/UserForm";
import { useDispatch, useSelector } from "react-redux";
import { getAllSedes } from "../../../actions/sedesActions"; */

export const Users = () => {
  const [showModal, setShowModal] = useState(false);
 
  const handleOpenModal = () => {
    setShowModal(true);
    /* setReload(false); */
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const panes = [
    {
      menuItem: "Activos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListUsers
            usersActive={true}
            /* sedes={sedes}
            reload={reload}
            onReload={onReload} */
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Inactivos",
      render: () => (
        <Tab.Pane attached={false}>
          <ListUsers
            usersActive={false}
            /* sedes={sedes}
            reload={reload}
            onReload={onReload} */
          />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <h2>Usuarios</h2>
      <div className="users-page">
        <div className="title-section">
          <Button className="add-user-btn" color="primary" onClick={handleOpenModal}>
            Nuevo usuario
          </Button>
        </div>
        <div className="list-users-table">
          <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        </div>
        {showModal && (
            <BasicModal handleCloseModal={handleCloseModal}></BasicModal>
        )}
        
      </div>
        {/* <Dialog>
        </Dialog> */}
    </>
  );
};