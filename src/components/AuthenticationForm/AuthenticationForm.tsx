import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
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
} from '@mantine/core';
import { FcGoogle } from "react-icons/fc";
import {FaFacebookSquare} from 'react-icons/fa'
import {RxCross1} from 'react-icons/rx'
import { setVisible } from '../../zustand/useAuthorizationFormStore';

interface Props extends PaperProps {
  googlelogin: () => any,
  facebooklogin: () => any,
  email: string,
  name: string,
  password: string,
}


export function AuthenticationForm(props: Props) {
  const [type, toggle] = useToggle(['zaloguj', 'zarejestruj']);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Nieprawidłowy email'),
      password: (val) => (val.length <= 6 ? 'Hasło musi zawierać przynajmniej 6 znaków' : null),
    },
  });

  const sendauth = (data: any) => {
    console.log(data)
  }

  return (
    <Paper radius="md" p="xl" withBorder {...props}>

      <ActionIcon onClick={() => setVisible(false)} color="dark" size="xs" radius="xl">
        <RxCross1/>
      </ActionIcon>
      <Space h="sm" />
      <Text size="lg" weight={500}>
        Witaj w Commenter, {type}  się za pomocą
      </Text>

      <Group grow mb="md" mt="md">
      <ActionIcon onClick={props.googlelogin} color="blue" size="lg" radius="md" variant="outline">
          <FcGoogle/>
        </ActionIcon>
        <ActionIcon onClick={props.facebooklogin} color="blue" size="lg" radius="md" variant="outline">
          <FaFacebookSquare/>
        </ActionIcon>
      </Group>

      <Divider label="Lub kontynuuj za pomocą email'a" labelPosition="center" my="lg" />

      <form onSubmit={(sendauth)}>
        <Stack>
          {type === 'zarejestruj' ? (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
            />
          ): null}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
          />

          <PasswordInput
            required
            label="Hasło"
            placeholder="Twoje hasło"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Hasło musi zawierać przynajmniej 6 znaków'}
          />

          {type === 'zarejestruj' ? (
            <Checkbox
              label="Akceptuję regulamin i warunki"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
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
          <Button type="submit">{upperFirst(type)}</Button>
        </Group>
      </form>
    </Paper>
  );
}