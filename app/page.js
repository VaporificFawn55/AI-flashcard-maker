import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Grid, Toolbar, Typography,  } from "@mui/material";
import Head from "next/head";

export default function Home() {
  return (
      <Container maxWidth="100%">
        <Head>
          <title gutterBottom>FlashCard Service</title>
          <meta name="description" content="Create flashcard for your text" />
        </Head>

        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6"  style={{flexGrow: 1}}>FlashCard Saas</Typography>
             <SignedOut> {/*if the poson is signed out it shows this */}
              <Button color="inherit" href="/sign-in"> Log in</Button>
              <Button color="inherit" href="/sign-up"> Sign up</Button>
            </SignedOut>
            <SignedIn> {/*if the poson is signed in it shows this */}
              <UserButton />
            </SignedIn>
          </Toolbar>
        </AppBar>

        <Box 
        sx={{
          textAlign:'center',
          my: 4,
        }}>
          <Typography variant="h2" gutterBottom>Welcome to FlashCard ProgramName</Typography>
          <Typography variant="h5" gutterBottom>
            {` `}
            Advertising Bull
            </Typography>
            <Button variant="contained" color="primary" sx={{mt: 2}}>Get started</Button>
        </Box>
        <Box sx = {{my: 6}}>
          <Typography variant="h4">
            Features
          </Typography>
          <Grid container spacing={4}>
          <Grid item xs={12} md={4}> 
              <Typography variant="h6">Easy Text Input blah blah</Typography>
              <Typography>
                {' '}
                Simply input your text and it will do it for you sure
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}> 
              <Typography variant="h6">Easy Text Input blah blah</Typography>
              <Typography>
                {' '}
                Simply input your text and it will do it for you sure
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{my: 6, textAlign: 'center'}}>
        <Typography variant="h4">Pricing</Typography>
        <Grid container rowSpacing={4} columnSpacing={{ xs: 2, sm: 4, md: 3 }} p={4}>

          <Grid item xs={12} md={4}>          
          <Box
              sx={{
                border: '1px solid',
                p: 3,
                borderColor: 'grey.400',
                borderRadius: '2px',
                height: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <Typography variant="h5">Price 1</Typography>
                <Typography variant="h6" gutterBottom>Smol Mulla</Typography>
                <Typography p={2}>Access to a basic flashcard features</Typography>
              </div>
              <Button color="primary" variant="contained">Basic Plan</Button>
            </Box>

          </Grid>
          <Grid item xs={12} md={4}>
          <Box
              sx={{
                border: '1px solid',
                p: 3,
                borderColor: 'grey.400',
                borderRadius: '2px',
                height: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <Typography variant="h5">Price 2</Typography>
                <Typography variant="h6" gutterBottom>MEdium Mulla</Typography>
                <Typography p={2}>Access to a basic flashcard features</Typography>
              </div>
              <Button color="primary" variant="contained">Basic Plan</Button>
            </Box>

          </Grid>
          <Grid item xs={12} md={4}>
          <Box
              sx={{
                border: '1px solid',
                p: 3,
                borderColor: 'grey.400',
                borderRadius: '2px',
                height: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <Typography variant="h5">Price 3</Typography>
                <Typography variant="h6" gutterBottom>CHUNGO Mulla</Typography>
                <Typography p={2}>ACCESS TO THE BIGGEST AND BADDEST FEATURES ON THE PLANET HECK YA</Typography>
              </div>
              <Button color="primary" variant="contained">THE ULTIMATE Plan</Button>
            </Box>
          </Grid>
        </Grid>
        </Box>
      </Container>
  );
}
