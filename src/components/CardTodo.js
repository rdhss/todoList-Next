import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DrawIcon from '@mui/icons-material/Draw';
import dateFormat, { masks } from "dateformat";
import { useDispatch } from 'react-redux';
import { fethingTodoDelete } from '@/app/store/todoList/action';
import ModalTodo from './Modal';
import { useState } from 'react';
import ModalTodoEdit from './ModalEdit';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function CardTodo({ data }) {
    const [expanded, setExpanded] = React.useState(false);
    const [editTodo, setEditTodo] = useState(true)
    const [openEdit, setOpenEdit] = useState(false)

    const dispatch = useDispatch()
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <>
            <ModalTodoEdit dataEdit={data} openModal={openEdit} handleCloseModal={() => setOpenEdit(false)} />
            <Card >
                <CardHeader
                    className='pt-5 pb-3 pr-9'
                    action={
                        <Typography variant="body2" color="text.secondary">
                            {dateFormat(data.created_at, "h:MM TT")}
                        </Typography>
                    }
                />
                <CardContent className='flex flex-col px-6 py-0'>
                    <Typography className={`${!data.is_complete ? null : 'line-through'}`} variant="h5" >
                        {data.name}
                    </Typography>
                    <Typography className={`${!data.is_complete ? null : 'line-through'}`} variant="body1" color="text.secondary">
                        {data.description}
                    </Typography>
                </CardContent>
                <CardActions sx={{ padding: '1px' }} className='flex justify-end mr-7'>
                    <Typography className='italic pr-5 pt-3' variant="body1" >
                        {!data.is_complete ? null : 'complete'}
                    </Typography>
                    <Button
                        startIcon={<DrawIcon />}
                        type="submit"
                        color='secondary'
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        className='bg-[#9c27b0]/80 hover:bg-[#9c27b0]'
                        onClick={() => setOpenEdit(true)}
                    >
                        Edit / Checked
                    </Button>
                    <Button
                        startIcon={<DeleteIcon />}
                        type="submit"
                        color='error'
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        className='bg-[#d32f2f]/80 hover:bg-[#d32f2f]'
                        onClick={() => dispatch(fethingTodoDelete(data.id))}
                    >
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </>

    );
}