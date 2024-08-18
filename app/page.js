'use client';

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Grid, Toolbar, Typography } from "@mui/material";
import Head from "next/head";

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
      <Head>
        <title>Flashy</title>
        <meta name="description" content="Create flashcards from your text" />
      </Head>

      <AppBar position="static" sx={{ backgroundColor: '#3f51b5', color: '#fff' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Flashy
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">Log In</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box 
        sx={{
          textAlign: 'center',
          my: 8,
          px: 2,
        }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
          Flashy
        </Typography>
        <Typography variant="h5" gutterBottom>
          An easy-to-use AI-powered flashcard generator!
        </Typography>
        <SignedIn>
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" href="/generate" sx={{ mr: 2 }}>
              Generate cards
            </Button>
            <Button variant="contained" color="primary" href="/flashcards">
              View Saved Cards
            </Button>
          </Box>
        </SignedIn>
        <SignedOut>
          <Typography variant="h6" sx={{ mt: 2 }}>
            You need to sign in to access the features. Please log in to continue.
          </Typography>
          <Button variant="contained" color="primary" href="/sign-in" sx={{ mt: 2 }}>
            Log In
          </Button>
        </SignedOut>
      </Box>

      <Box sx={{ my: 8 }}>
        <Typography variant="h4" gutterBottom align="center">
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 2 }}>
              <Typography variant="h6">Generate Flashcards from Text</Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                Simply input your text, and our AI will generate flashcards for you.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 2 }}>
              <Typography variant="h6">Save Your Flashcards</Typography>
              <Typography variant="body1" sx={{ mt: 1 }}>
                Save your generated flashcards with a single click!
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 8 }}>
        <Typography variant="h4" gutterBottom align="center">
          Pricing
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                textAlign: 'center',
                backgroundColor: '#fff',
                boxShadow: 2,
              }}
            >
              <Typography variant="h5">Basic Plan</Typography>
              <Typography variant="h6" gutterBottom>
                $10/month
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Access to basic flashcard features.
              </Typography>
              <Button color="primary" variant="contained">Select Plan</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                textAlign: 'center',
                backgroundColor: '#fff',
                boxShadow: 2,
              }}
            >
              <Typography variant="h5">Standard Plan</Typography>
              <Typography variant="h6" gutterBottom>
                $20/month
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Includes all features from the Basic Plan, plus more.
              </Typography>
              <Button color="primary" variant="contained">Select Plan</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 2,
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                textAlign: 'center',
                backgroundColor: '#fff',
                boxShadow: 2,
              }}
            >
              <Typography variant="h5">Premium Plan</Typography>
              <Typography variant="h6" gutterBottom>
                $30/month
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Access to all features with premium support and more.
              </Typography>
              <Button color="primary" variant="contained">Select Plan</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
