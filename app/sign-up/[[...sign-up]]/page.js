import { SignIn } from "@clerk/nextjs";
import { AppBar, Box, Container, Toolbar, Typography, Button} from "@mui/material";
import Link from "next/link";

export default function SignUpPage(){
    return <Container maxWidth="sm">
        <AppBar position="static" sx={{ backgroundColor: '#f67676'}}>
            <Toolbar>
                <Typography
                variant="h6"
                sx={{
                    flexGrow:1,
                }}
                >
                    Flashy
                </Typography>
                <Button sx={{ backgroundColor: '#ffffff'}}>
                    <Link href = "/sign-up" passHref>
                    Sign up
                    </Link>
                </Button>

                <Button sx={{ backgroundColor: '#ffffff'}}>
                    <Link href = "/sign-in" passHref>
                    Log in
                    </Link>
                </Button>
            </Toolbar>
        </AppBar>

        <Box 
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}>
            <Typography variant="h4" p={3}>Sign up</Typography>
            <SignIn/>
        </Box>
    </Container>
}