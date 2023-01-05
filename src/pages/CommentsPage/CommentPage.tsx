import React, { forwardRef, Suspense, useEffect } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import {
  Header,
  Group,
  Box,
  Container,
  TextInput,
  Button,
  Space,
  Grid,
  Avatar,
  Text,
  Select,
  Title,
  Overlay 
} from '@mantine/core'
import { Comment } from '../../components/Comment/comment';

import {db} from '../../firebase'
import {collection, addDoc,  query, orderBy, onSnapshot, getDoc, where, doc, getDocs, DocumentData} from 'firebase/firestore'
import { useState } from 'react';
import { AuthenticationForm } from '../../components/AuthenticationForm/AuthenticationForm';
import { setVisible, useAuthorizationFormStore } from '../../zustand/useAuthorizationFormStore';
import { logoutUser, useAuthorizationStore } from '../../zustand/useAuthorizationStore';
import { cursedWords } from '../../components/Comment/cursedWordsDataset';
import UserMenu from '../../components/UserMenu/UserMenu';
import { setPokedUser, useUserMenuStore } from '../../zustand/useUserMenuStore';


var Filter = require('bad-words');
const filter = new Filter();
filter.addWords(...cursedWords); 

function CommentPage() {
  const largeScreen = useMediaQuery('(min-width: 900px)');
  const [value, setValue] = useState('');
  const pokedUser = useUserMenuStore((state) => state.pokedUser)
  const [comments, setComments] = useState<any>([])
  const isVisible = useAuthorizationFormStore((state) => state.isVisible)
  const authorized = useAuthorizationStore((state) => state.authorized)
  const username = useAuthorizationStore((state) => state.username)
  const userImage = useAuthorizationStore((state) => state.userimage)

  
  const sendMessage = async (e: any) => {
    var postedAt = new Date().toLocaleString("en-US");
    console.log(pokedUser)
    if(pokedUser){
      e.preventDefault()
      try {
        
        await addDoc(collection(db, 'comment'), {
          postedAt: postedAt,
          body: filter.clean(value),
          name: username,
          image: userImage,
          poked: pokedUser
        })
        setPokedUser(null)
        setValue('')

      } catch (err) {
        alert(err)
      }
    }
  }

  useEffect(() => {
    const q = query(collection(db, 'comment'), orderBy('postedAt', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      setComments(querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  },[])


  const listItems = comments.map((comment: any) =>
  <>
      <Comment 
        key={comment.toString()} 
        postedAt={comment.data.postedAt} 
        body={comment.data.body} 
        author={{
          name: comment.data.name,
          image: comment.data.image
        }} 
        poked={comment.data.poked}/>
      <Space h="md" />
  </>

);

  return (
    
    <>
      <Box pb={120}>
        <Header height={60} px="lg">
          <Group sx={{ height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div></div>
            <Title order={3}> Commenter <Text span c="blue" inherit> Application</Text></Title>
              {
              !authorized ? 
              <Button onClick={() => {setVisible(true)}}>Log in</Button> 
              : 
              <Button onClick={() => {logoutUser()}}>Log out</Button> 
              }
          </Group>
        </Header>
        {
          authorized ? 
          <Container my="md">
            <Grid>
              <Grid.Col span={largeScreen ? 9 : 12}>
                <TextInput
                  pt={20}
                  pb={largeScreen ? 10 : 0}
                  size='md'
                  label="Dodaj komentarz:"
                  placeholder=""
                  value={value} onChange={(event) => setValue(event.currentTarget.value)} />
              </Grid.Col>
              <Grid.Col span={largeScreen ? 3 : 12}>
                <UserMenu/>
              </Grid.Col>
            </Grid>
            <Button variant="outline" color="dark" size="md" onClick={sendMessage}>
              Wyślij
            </Button>
            <Space h="xl" />
            {listItems}
          </Container>
          : 
          <Container my="md"> 
          {listItems}
          </Container>
        }
      </Box>



        {isVisible ? 
        <Group position="center">
        <AuthenticationForm 
          email={''} 
          name={''} 
          password={''} 
          sx={{
            zIndex: 20,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />
        <Overlay opacity={0.6} color="#000" blur={2} zIndex={1}/>
        </Group> : null}
      
    </>

  );
}

export default CommentPage;



