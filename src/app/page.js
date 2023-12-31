"use client";

import CardTodo from '@/components/CardTodo';
import HeaderTodo from '@/components/Header'
import ModalTodo from '@/components/Modal'
import { Button, Container} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { redirect } from "next/navigation";
import { fethingTodo } from './store/todoList/action';


const Home = () => {
  const [openModal, setOpenModal] = React.useState(false);
  // const [user, setUser] = useState()
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const todo = useSelector((state) => state.todo.data)
  const dispatch = useDispatch()
  let user =  typeof window !== "undefined" ? window.localStorage.getItem('token') : false

  // Server-render loading state
  useEffect(() => {
    if (!user || user.isLoggedIn === false) {
      return redirect("/login");
    } 
    dispatch(fethingTodo())
  },[])



  return (
    <div>
      <HeaderTodo />
      <main >
        <Container sx={{ mt: 3, mb: 2 }} maxWidth="md">
          <ModalTodo openModal={openModal} handleCloseModal={handleCloseModal} handleOpenModal={handleOpenModal} />
          <Button
            type="submit"
            fullWidth
            color='secondary'
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            className='bg-[#9c27b0]/80 hover:bg-[#9c27b0]'
            onClick={() => setOpenModal(true)}
          >
            Add Todo +
          </Button>
          <main className='flex flex-col gap-10'>
            {todo?.data?.map((data) => 
                <CardTodo key={data.id} data={data}/>
            )}
          </main>
        </Container>
      </main>
    </div>
  )
}

export default Home