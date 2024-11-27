import {
  Box,
  Button,
  MantineStyleProp,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useState } from 'react';

interface HeaderProps {
  username: string;
  onLogout: () => void;
}

const Header = ({ username, onLogout }: HeaderProps) => {
  const theme = useMantineTheme();
  const [isLogoutHovered, setIsLogoutHovered] = useState<boolean>(false);
  const [isProfileHovered, setIsProfileHovered] = useState<boolean>(false);

  const headerContainerStyles = {
    backgroundColor: theme.colors.backgroundColor[0],
    height: '8%',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '18px',
    marginTop: '25px',
    userSelect: 'none',
  } as MantineStyleProp;

  const infoBarStyles = {
    top: '0px',
    width: '50%',
    paddingLeft: '25px',
    paddingRight: '50px',
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: '18px',
  } as MantineStyleProp;

  const buttonStyles = (isHovered: boolean) =>
    ({
      marginLeft: '20px',
      float: 'right',
      backgroundColor: isHovered ? 'indigo' : theme.colors.backgroundColor[0],
      color: 'white',
      height: '40px',
      borderStyle: 'solid',
      fontSize: '18px',
      borderRadius: '8px',
      borderColor: 'white',
      padding: '5px 10px 5px 10px',
      cursor: 'pointer',
    } as MantineStyleProp);

  return (
    <Box style={headerContainerStyles}>
      <Title order={1} style={{ marginLeft: '50px' }}>
        Hippo 🦛 TFT Team Builder
      </Title>
      <Box style={infoBarStyles}>
        <Button
          style={buttonStyles(isProfileHovered)}
          onMouseEnter={() => setIsProfileHovered(true)}
          onMouseLeave={() => setIsProfileHovered(false)}
        >
          {username}
        </Button>
        <Button
          style={buttonStyles(isLogoutHovered)}
          onClick={onLogout}
          onMouseEnter={() => setIsLogoutHovered(true)}
          onMouseLeave={() => setIsLogoutHovered(false)}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
