import { useState } from 'react';
import { Box, Button, MantineStyleProp, TextInput } from '@mantine/core';

interface LoginProps {
  onSubmitUsername: (username: string) => void;
}

const LoginContainerStyles = {
  fontSize: '24px',
  textAlign: 'center',
  margin: '20px',
} as MantineStyleProp;

const Login: React.FC<LoginProps> = ({ onSubmitUsername }) => {
  const [username, setUsername] = useState('');

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
      <Box>Enter your username</Box>
      <TextInput
        value={username}
        onChange={onNameChange}
        onKeyDown={keySubmitName}
      />
      <Button onClick={() => onSubmitUsername(username)}>Submit</Button>
    </Box>
  );
};

export default Login;
