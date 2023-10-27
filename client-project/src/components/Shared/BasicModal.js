import { Box, Modal, Button} from '@mui/material';
import React from 'react';
import CreateUser from '../Admin/Users/CreateUser';

export const BasicModal = ({ handleCloseModal }) => {
  return (
    <div>
      <Modal open={true} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '800px',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Button
            onClick={handleCloseModal}
            variant="contained"
            color="error"
            sx={{
              marginLeft: 'auto',
              alignSelf: 'flex-end', 
            }}
          >
            X
          </Button>

          <CreateUser handleCloseModal={handleCloseModal} />

        </Box>
      </Modal>
    </div>
  );
};
