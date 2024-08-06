import { useMutation } from "@apollo/client";
import {
  Anchor,
  Box,
  Button,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { gql } from "../__generated__/gql";

const LOGIN = gql(`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      organizations {
        id
        name
        users {
          id
          name
          surname
          email
        }
      }
    }
  }
`);

interface LoginValues {
  email: string;
  password: string;
}

const initialFormValues = {
  email: "",
  password: "",
};

interface Props {
  setToken: (token: string) => void;
}

function Login({ setToken }: Props) {
  const [values, setValues] = useState<LoginValues>(initialFormValues);
  const [errors, setErrors] = useState<LoginValues>(initialFormValues);

  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted(data) {
      setErrors(initialFormValues);

      console.log(
        "Пользователь:",
        `${data.login?.organizations[0].users[0].name} ${data.login?.organizations[0].users[0].surname}`
      );
      if (data.login?.token) {
        setToken(data.login?.token);
        localStorage.setItem("token", data.login?.token);
      }
    },
    onError(error) {
      setErrors(initialFormValues);
      console.log("error", error);
    },
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = values;

    if (email && password) {
      login({ variables: { email, password } });
    }

    if (!email) {
      setErrors((prev) => ({
        ...prev,
        email: "Введите адрес электронной почты",
      }));
    }

    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Введите пароль" }));
    }

    console.log("email, password", email, password);
  };

  return (
    <Box mt="8rem">
      <Box ta={"center"} fz="2rem" mb="xs">
        <Text span inherit c="red">
          A-
        </Text>
        <Text span inherit c="blue">
          CORE
        </Text>
      </Box>
      <Paper withBorder w={400} mx="auto" p="sm">
        <form onSubmit={handleSubmit}>
          <Stack align="stretch">
            <Title order={5} ta="center">
              Ввойдите в свой аккаунт
            </Title>

            <TextInput
              label="Адрес электронной почты"
              name="email"
              // required
              withAsterisk
              placeholder="admin@admin.com"
              type="email"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
            />
            <PasswordInput
              label="Пароль"
              name="password"
              placeholder="admin"
              // required
              withAsterisk
              value={values.password}
              onChange={handleChange}
              error={errors.password}
            />
            <Button fullWidth variant="outline" type="submit" loading={loading}>
              Продолжить
            </Button>

            <Anchor
              ta="center"
              onClick={
                () => setValues({ email: "admin@admin.com", password: "admin" }) // LOL
              }
            >
              Не удается войти в систему?
            </Anchor>
          </Stack>
        </form>
        {error && (
          <Text c="red" ta="center">
            Произошла ошибка, попробуйте позже
          </Text>
        )}
      </Paper>
    </Box>
  );
}

export default Login;
