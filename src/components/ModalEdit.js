import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import CloseIcon from '@mui/icons-material/Close';
import TextAreaModal from './TextAreaModal';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';
import { fethingTodoEdit, fethingTodoPost } from '@/app/store/todoList/action';

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



export default function ModalTodoEdit({ openModal, handleCloseModal, handleOpenModal, dataEdit }) {
  const [dataEditForm, setDataEditForm] = React.useState(dataEdit)
  const dispatch = useDispatch()
  const todoError = useSelector((state) =>  state.todo.error)
  const handlePost = () => {
    dispatch(fethingTodoEdit({
      id : dataEditForm.id,
      data : {
        name : dataEditForm.name,
        description : dataEditForm.description,
        is_complete : dataEditForm.is_complete
      }
    })) 
  handleCloseModal()
  }


  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title-edit"
        aria-describedby="modal-modal-description-edit"
      >
        <Box sx={style}>
          <CloseIcon onClick={handleCloseModal} className='cursor-pointer' sx={{ position: 'absolute', top: 15, right: 30 }} />
          <Typography sx={{ mb: 4 }} id="modal-modal-title-edit" variant="h6" component="h2">
            Edit Todo
          </Typography>
          <Box flexDirection={'column'} display={'flex'} gap={2}>
            <TextField value={dataEditForm.name} id="standard-basic" color='secondary' label="Name" variant="outlined" onChange={(e) => { setDataEditForm({ ...dataEditForm, name: e.target.value }) }}/>
            <TextAreaModal value={dataEditForm.description} placeholder="description" onchange={(e) => { setDataEditForm({ ...dataEditForm, description: e.target.value }) }} />
          </Box>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Complete" checked={dataEditForm?.is_complete}  onChange={() => setDataEditForm({...dataEditForm, is_complete : !dataEditForm.is_complete})} />
          <Button
            onClick={handlePost}
            type="submit"
            fullWidth
            color='secondary'
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            className='bg-[#9c27b0]/80 hover:bg-[#9c27b0]'
          >
            Edit Todo 
          </Button>
        </Box>
      </Modal>
    </div>
  );
}