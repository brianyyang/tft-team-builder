import { useState } from 'react';
import { Box, Button, TextInput } from '@mantine/core';

interface LoginProps {
  onSubmitUsername: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onSubmitUsername }) => {
  const [username, setUsername] = useState('');

  const onNameChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value.length > 16) {
      setUsername(e.target.value.substring(0, 16));
    } else {
      setUsername(e.target.value);
    }
  };

  return (
    <Box>
      <Box>Enter your username</Box>
      <TextInput value={username} onChange={onNameChange} />
      <Button onClick={() => onSubmitUsername(username)}>Submit</Button>
    </Box>
  );
};

export default Login;
