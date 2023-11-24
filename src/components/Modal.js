import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import CloseIcon from '@mui/icons-material/Close';
import TextAreaModal from './TextAreaModal';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import { fethingTodoPost } from '@/app/store/todoList/action';

const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #9c27b0',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
  overflow: 'hidden'
};



export default function ModalTodo({ openModal, handleCloseModal, handleOpenModal }) {
  const [dataPost, setDataPost] = React.useState({
    name: '',
    description: ''
  })
  const dispatch = useDispatch()
  const todoError = useSelector((state) =>  state.todo.error)
  const handlePost = () => {
    dispatch(fethingTodoPost({
      name : dataPost.name,
      description : dataPost.description
    })) 

  handleCloseModal()

  }


  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CloseIcon onClick={handleCloseModal} className='cursor-pointer' sx={{ position: 'absolute', top: 15, right: 30 }} />
          <Typography sx={{ mb: 4 }} id="modal-modal-title" variant="h6" component="h2">
            Add Todo
          </Typography>
          <Box flexDirection={'column'} display={'flex'} gap={2}>
            <TextField id="standard-basic" color='secondary' label="Name" variant="outlined" onChange={(e) => { setDataPost({ ...dataPost, name: e.target.value }) }}/>
            <TextAreaModal placeholder="description" onchange={(e) => { setDataPost({ ...dataPost, description: e.target.value }) }} />
          </Box>
          <Button
            onClick={handlePost}
            type="submit"
            fullWidth
            color='secondary'
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            className='bg-[#9c27b0]/80 hover:bg-[#9c27b0]'
          >
            Add Todo +
          </Button>
        </Box>
      </Modal>
    </div>
  );
}