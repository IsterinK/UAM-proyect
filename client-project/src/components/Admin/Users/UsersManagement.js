import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Auth } from "../../../api/index";

const columns = [
    { id: 'name', label: 'Nombre', minWidth: 50 },
    { id: 'lastname', label: 'Apellido', minWidth: 50 },
    { id: 'email', label: 'Correo Electrónico', minWidth: 50 },
    { id: 'active', label: 'Activo', minWidth: 50 },
    { id: 'rol', label: 'Rol', minWidth: 50 },
];

export default function ListUsers({ usersActive }) {
  const auth = new Auth();
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  React.useEffect(() => {
    getUsers()
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getUsers = async () => {
    try {
      const response = await auth.getUsers();
      const usersWithStatus = response.map(user => ({
        ...user,
        active: user.active ? 'Activo' : 'Inactivo'
      }));

      const filteredUsers = usersActive
        ? usersWithStatus.filter(user => user.active === 'Activo')
        : usersWithStatus.filter(user => user.active === 'Inactivo');

      console.log("activos", usersWithStatus.filter(user => user.active === 'Activo'))
      console.log("inactivos", usersWithStatus.filter(user => user.active === 'Inactivo'))
      setRows(filteredUsers);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}