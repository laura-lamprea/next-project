import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Label from 'src/components/label';
import { useSession, signOut } from 'next-auth/react';
import { CiLogout } from 'react-icons/ci';

export default async function NavUpgrade() {
  const { data: session } = useSession();
  const avatarUrl = session?.user?.image
    ? session.user.image
    : 'https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp';

  const userName = session?.user?.name ?? 'No Name';
  const userEmail = session?.user?.email ?? 'No Email';

  return (
    <Stack
      sx={{
        px: 2,
        py: 5,
        textAlign: 'center',
      }}
    >
      <Stack alignItems="center">
        <Box sx={{ position: 'relative' }}>
          <Avatar src={avatarUrl} alt={userName} sx={{ width: 48, height: 48 }}>
            {userName ?? 'No Name'}
          </Avatar>

          <Label
            color="success"
            variant="filled"
            sx={{
              top: -6,
              px: 0.5,
              left: 40,
              height: 20,
              position: 'absolute',
              borderBottomLeftRadius: 2,
            }}
          >
            Free
          </Label>
        </Box>

        <Stack spacing={0.5} sx={{ mb: 2, mt: 1.5, width: 1 }}>
          <Typography variant="subtitle2" noWrap>
            {userName ?? 'No Name'}
          </Typography>

          <Typography variant="body2" noWrap sx={{ color: 'text.disabled' }}>
            {userEmail}
          </Typography>
        </Stack>

        <Button
          variant="contained"
          onClick={() => signOut()}
          sx={{ backgroundColor: 'red', color: 'white' }}
          startIcon={<CiLogout />}
        >
          Logout
        </Button>
      </Stack>
    </Stack>
  );
}
