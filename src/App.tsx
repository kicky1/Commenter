import React, { forwardRef, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';


import {
  createStyles,
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
} from '@mantine/core'
import { Comment } from './components/comment';

import {db} from './firebase'
import {collection, addDoc,  query, orderBy, onSnapshot} from 'firebase/firestore'

import { useState } from 'react';

const dataSet = [
  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
    label: 'Daniel',
    value: 'Daniel',
    description: 'Lubi dupnąć sobie w lolka',
  },

  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
    label: 'Krzysiem',
    value: 'Krzysiem',
    description: 'Tft to jego pasja',
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/homer-simpson.png',
    label: 'Nomysz',
    value: 'Nomysz',
    description: 'Kiedyś długo stał na rękach',
  }
];


interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image: string;
  label: string;
  description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} />
        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.65}>
            {description}
          </Text>
        </div>
      </Group>
    </div>
  )
);



function App() {
  const [value, setValue] = useState('');
  const [username, setUsername] = useState<string | null>(null)
  const [comments, setComments] = useState<any>([])


  const handleSubmit = async (e: any) => {
    var postedAt = new Date().toLocaleTimeString("en-US");
    var userImage = ''

    switch (username) {
      case 'Daniel':
        userImage = 'https://img.icons8.com/clouds/256/000000/futurama-bender.png'
        break;
      case 'Krzysiem':
        userImage = 'https://img.icons8.com/clouds/256/000000/futurama-mom.png'
        break;
      case 'Nomysz':
        userImage = 'https://img.icons8.com/clouds/256/000000/homer-simpson.png'
        break;
      default:
    }


    e.preventDefault()
    try {
      await addDoc(collection(db, 'comment'), {
        postedAt: postedAt,
        body: value,
        name: username,
        image: userImage
      })
      
      setValue('')
      setUsername('')


    } catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
    const q = query(collection(db, 'comment'), orderBy('postedAt', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      setComments(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  },[])


  const listItems = comments.map((comment: any) =>
  <>
      <Comment key={comment.toString()} postedAt={comment.data.postedAt} body={comment.data.body} author={{
        name: comment.data.name,
        image: comment.data.image
      }} />
      <Space h="md" />
  </>
);

  return (
    
    <Box pb={120}>
    <Header height={60} px="lg">
      <Group position="center" sx={{ height: '100%' }}>
        <Group sx={{ height: '100%' }} spacing={0}>
        <Title order={3}> Commenter <Text span c="blue" inherit> Application</Text></Title>
        </Group>
      </Group>
    </Header>
    <Container my="md">
      <Grid>
        <Grid.Col span={9}>
        <TextInput 
          pt={20} 
          pb={10} 
          size='md' 
          label="Dodaj komentarz:" 
          placeholder="" 
          value={value} onChange={(event) => setValue(event.currentTarget.value)} 
        />
        </Grid.Col>
        <Grid.Col span={3}>
        <Select
          pt={20} 
          pb={10} 
          size='md'
          label="Wybierz użytkownika"
          placeholder="Pick one"
          itemComponent={SelectItem}
          data={dataSet}
          searchable
          maxDropdownHeight={400}
          nothingFound="Nobody here"
          value={username} 
          onChange={setUsername}
        />
        </Grid.Col>
      </Grid>

    <Button variant="outline" color="dark" size="md" onClick={handleSubmit}>
      Dodaj
    </Button>
    <Space h="xl" />
    {listItems}
    </Container>

  </Box>
  );
}

export default App;


