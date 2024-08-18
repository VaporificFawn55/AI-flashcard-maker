'use client';

import { useUser } from "@clerk/nextjs";
import { Box, Button, CardActionArea, CardContent, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, TextField, Typography, AppBar, Toolbar } from "@mui/material";
import { writeBatch, collection, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { db } from '/firebase'; // Ensure this path is correct
import Link from 'next/link'; // Import Link for navigation
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Generate() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState({});
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                body: text,
            });

            const textResponse = await response.text();
            console.log('Response Text:', textResponse);

            const data = JSON.parse(textResponse);
            console.log('Parsed Data:', data);

            setFlashcards(data.flashcards || []);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to generate flashcards. Please try again.');
        }
    };

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const saveFlashCards = async () => {
        if (!isSignedIn) {
            alert('User is not signed in.');
            return;
        }

        if (!user || !user.id) {
            alert('User information is not available.');
            return;
        }

        if (!name) {
            alert('Please enter a name');
            return;
        }

        try {
            const batch = writeBatch(db);
            const userDocRef = doc(collection(db, 'users'), user.id);
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists()) {
                const collections = docSnap.data().flashcards || [];
                if (collections.find((f) => f.name === name)) {
                    alert("Flashcard collection with the same name already exists");
                    return;
                } else {
                    collections.push({ name });
                    batch.set(userDocRef, { flashcards: collections }, { merge: true });
                }
            } else {
                batch.set(userDocRef, { flashcards: [{ name }] });
            }

            const colRef = collection(userDocRef, name);
            flashcards.forEach((flashcard) => {
                const cardDocRef = doc(colRef);
                batch.set(cardDocRef, flashcard);
            });

            await batch.commit();
            handleClose();
            router.push('/flashcards');
        } catch (error) {
            console.error('Error saving flashcards:', error);
            alert('Failed to save flashcards. Please try again.');
        }
    };

    return (
        <Container maxWidth="md">
            <AppBar position="static" sx={{ backgroundColor: 'primary', boxShadow: 3 }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link href="/" passHref>
                        <Typography
                            variant="h6"
                            sx={{
                                color: '#ffffff',
                                textDecoration: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            Flashy
                        </Typography>
                    </Link>
                    <Box>
                        <SignedOut>
                            <Button color="inherit" href="/sign-in">
                                Log In
                            </Button>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </Box>
                </Toolbar>
            </AppBar>

            <Box sx={{ mt: 4, mb: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4">Generate your FlashCard</Typography>
                <Paper sx={{ p: 4, width: '100%' }}>
                    <TextField
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        label="Enter text"
                        fullWidth
                        multiline
                    />
                </Paper>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    fullWidth
                    sx={{ backgroundColor: "primary", color: '#ffffff', mt: 2 }}
                >
                    Submit
                </Button>
            </Box>
            {flashcards.length > 0 && (
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5">FlashCard Preview</Typography>
                    <Grid container spacing={2}>
                        {flashcards.map((flashcard, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                                <CardActionArea onClick={() => handleCardClick(index)}>
                                    <CardContent sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '300px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        backgroundColor: '#f9f9f9', // Optional background color for better visibility
                                    }}>
                                        <Box sx={{
                                            perspective: '1000px',
                                            width: '100%',
                                            height: '100%',
                                            '& > div': {
                                                transition: 'transform 0.6s',
                                                transformStyle: 'preserve-3d',
                                                position: 'relative',
                                                width: '100%',
                                                height: '100%',
                                                boxShadow: '0 4px 8px 0 rgba(0,0,0, 0.2)',
                                                transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                            },
                                            '& > div > div': {
                                                position: 'absolute',
                                                width: '100%',
                                                height: '100%',
                                                backfaceVisibility: 'hidden',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                padding: 2,
                                                boxSizing: 'border-box',
                                                overflow: 'hidden'
                                            },
                                            '& > div > div:nth-of-type(2)': {
                                                transform: 'rotateY(180deg)',
                                            },
                                        }}>
                                            <div>
                                                <div>
                                                    <Typography variant="h6" component={'div'} sx={{ textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        {flashcard.front}
                                                    </Typography>
                                                </div>
                                                <div>
                                                    <Typography variant="h6" component={'div'} sx={{ textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        {flashcard.back}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Grid>
                        ))}
                    </Grid>
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                        <Button variant="contained" color='secondary' onClick={handleOpen}>
                            Save
                        </Button>
                    </Box>
                </Box>
            )}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Save FlashCards</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the name of the flashcards
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Collection name"
                        type="text"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={saveFlashCards}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
