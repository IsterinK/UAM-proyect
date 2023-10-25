import { Box, Modal } from '@mui/material'
import React from 'react'
import { Button } from 'semantic-ui-react'
import SignUp from '../Auth/SignUp/SignUp'
export const BasicModal = ({handleCloseModal}) => {
  return (
    <div>
      <Modal open={true} onClose={handleCloseModal}>
        <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '700px', 
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        }}>
            <SignUp></SignUp>
            <Button onClick={handleCloseModal} variant="contained" color="primary" sx={{ marginTop: '16px' }}>
                Cerrar
            </Button>
        </Box>
      </Modal>
    </div>
  )
}


