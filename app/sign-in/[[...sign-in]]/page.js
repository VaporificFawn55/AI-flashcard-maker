import { SignIn } from "@clerk/nextjs";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

export default function SignInPage() {
  return (
    <Container maxWidth="sm" sx={{ my: 4 }}>
      <AppBar position="static" sx={{ backgroundColor: '#ffffff', boxShadow: 3 }}>
        <Toolbar>
          <Link href="/" passHref>
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                color: '#f67676',
                textDecoration: 'none',
                cursor: 'pointer'
              }}
            >
              Flashy
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: '#ffffff',
          p: 3,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: '#f67676' }}>
          Sign In
        </Typography>
        <SignIn
          style={{
            width: '100%',
            maxWidth: '400px',
            margin: '0 auto',
          }}
        />
      </Box>
    </Container>
  );
}
