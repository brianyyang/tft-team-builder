import { useState } from 'react';
import {
  Box,
  Button,
  MantineStyleProp,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';

interface LoginProps {
  onSubmitUsername: (username: string) => void;
}

const LoginContainerStyles = {
  display: 'flex',
  height: '100%',
  fontSize: '24px',
  textAlign: 'center',
  margin: '20px',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
} as MantineStyleProp;

const Login: React.FC<LoginProps> = ({ onSubmitUsername }) => {
  const theme = useMantineTheme();
  const [username, setUsername] = useState<string>('');
  const [isSubmitHovered, setIsSubmitHovered] = useState<boolean>(false);

  const submitButtonStyles = (isSubmitHovered: boolean) =>
    ({
      backgroundColor: isSubmitHovered
        ? 'indigo'
        : theme.colors.backgroundColor[0],
      color: 'white',
      height: '2rem',
      borderStyle: 'solid',
      fontSize: '1rem',
      borderRadius: '5px',
      borderColor: 'white',
      padding: '5px 10px 5px 10px',
      cursor: 'pointer',
      margin: '1rem',
    } as MantineStyleProp);

  const onNameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value.length > 16) {
      setUsername(e.target.value.substring(0, 16));
    } else {
      setUsername(e.target.value);
    }
  };

  const keySubmitName: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') onSubmitUsername(username);
  };

  return (
    <Box style={LoginContainerStyles}>
      <Title order={3}>Enter your username</Title>
      <TextInput
        value={username}
        onChange={onNameChange}
        onKeyDown={keySubmitName}
      />
      <Button
        onClick={() => onSubmitUsername(username)}
        style={submitButtonStyles(isSubmitHovered)}
        onMouseEnter={() => setIsSubmitHovered(true)}
        onMouseLeave={() => setIsSubmitHovered(false)}
      >
        Submit
      </Button>
    </Box>
  );
};

export default Login;
