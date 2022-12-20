import * as Yup from 'yup';
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm, yupResolver  } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  ActionIcon,
  Space,
  Grid,
  Notification,
} from '@mantine/core';
import { FcGoogle } from "react-icons/fc";
import {RxCross1} from 'react-icons/rx'
import { setVisible } from '../../zustand/useAuthorizationFormStore';
import { createUserAccountWithEmailAndPassword, signUserAccountWithEmailAndPassword } from '../../firebase';
import { IconX } from '@tabler/icons';
import { useEffect, useState } from 'react';

interface Props extends PaperProps {
  googlelogin: () => any,
  email: string,
  name: string,
  password: string,
}

const registrationSchema = Yup.object().shape({
  name: Yup.string().min(3, 'Imie powinno skłądać się przynajmniej z 3 liter') ,
  password: Yup.string().min(6, 'Hasło powinno składać się przynajmniej z 6 znaków'),
  email: Yup.string().email('Nieprawidłowy email'),
  terms: Yup.boolean()
    .oneOf([true], "Regulami oraz warunki korzystania z strony muszą zostać zatwierdzone.")
});

const loginSchema = Yup.object().shape({
  password: Yup.string().min(6, 'Hasło powinno składać się przynajmniej z 6 znaków'),
  email: Yup.string().email('Nieprawidłowy email'),
});


export function AuthenticationForm(props: Props) {
  const [type, toggle] = useToggle(['zaloguj', 'zarejestruj']);
  const [isError, setError] = useState(false)
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: false,
    },
    validate: yupResolver(type === 'zarejestruj' ? registrationSchema  : loginSchema),
  });

  const handleSubmit = async (values: any) => {
    const res = await createUserAccountWithEmailAndPassword(values.email, values.password, values.name)
    if( res === 'auth/email-already-in-use'){
      setError(true)
    }
  };

  const handleLogin = (values: any) => {
    signUserAccountWithEmailAndPassword(values.email, values.password)
  };

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <ActionIcon onClick={() => setVisible(false)} color="dark" size="xs" radius="xl">
        <RxCross1/>
      </ActionIcon>
      <Space h="sm" />
      {isError ?
          <Notification icon={<IconX size={18} />} color="red" onClose={() => setError(false)}>
          Konto o takim email'u już istnieje!
          </Notification> : null
        }
      <Space h="sm" />
      <Text size="lg" weight={500}>
        Witaj w Commenter, {type}  się za pomocą
      </Text>
      <Grid>
        <Grid.Col span={4}></Grid.Col>
        <Grid.Col span={4}>
        <Group grow mt="md">
          <ActionIcon onClick={props.googlelogin} color="blue" size="lg" radius="md" variant="outline">
            <FcGoogle/>
          </ActionIcon>
          </Group>
        </Grid.Col>
        <Grid.Col span={4}></Grid.Col>
      </Grid>
      <Divider label="Lub kontynuuj za pomocą email'a" labelPosition="center" my="lg" />

      <form onSubmit={type === 'zarejestruj' ? (form.onSubmit((values) => handleSubmit(values))) : (form.onSubmit((values) => handleLogin(values)))  }>
        <Stack>
          {type === 'zarejestruj' ? (
            <TextInput
              label="Name"
              placeholder="Twoje imię"
              {...form.getInputProps('name')}
            />
          ): null}

          <TextInput
            required
            label="Email"
            placeholder="username@gmail.com"
            value={form.values.email}
            {...form.getInputProps('email')}
          />

          <PasswordInput
            required
            label="Hasło"
            placeholder="Twoje hasło"
            value={form.values.password}
            {...form.getInputProps('password')}
          />

          {type === 'zarejestruj' ? (
            <Checkbox
              label="Akceptuję regulamin i warunki"
              {...form.getInputProps('terms')}
            />
          ): null}
        </Stack>
        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === 'zarejestruj'
              ? 'Posiadasz już konto? Zaloguj się'
              : "Nie masz konta? Zarejestruj się"}
          </Anchor>
          {type === 'zarejestruj'
              ? <Button type="submit">{upperFirst(type)}</Button>
              : <Button type="submit">{upperFirst(type)}</Button>}
        </Group>
      </form>
    </Paper>
  );
}