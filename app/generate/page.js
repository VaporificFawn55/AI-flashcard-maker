'use client'

import { useUser } from "@clerk/nextjs"
import { Box, Button, Card, CardActionArea, CardContent, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, TextField, Typography } from "@mui/material"
import { writeBatch } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Generate(){
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])
    const [text, setText] = useState('')
    const [name, setname] = useState('')
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const handleSubmit= async () => {
        fetch(`/api/generate`, {
            method: 'POST',
            body: text,
        })
        .then((res) => res.json())
        .then((data) => setFlashcards(data))
    }

    const handleCardClick = (id) =>{
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    const handleOpen = () =>{
        setOpen(true)
    }
    const handleClose = () =>{
        setOpen(false)
    }
    const saveFlashCards = async () =>{
        if (!name){
            alert('Please enter a name')
            return
        }

        const batch = writeBatch(db)
        const userDocRef = doc(collection (db, 'users'), user.id)
        const docSnap = await getDoc(userDocRef)
        if(docSnap.exists()) {
            const collections = docSnap.data().flashcards || []
            if(collections.find((f)=> f.name === name)){
                alert("Flashcard collection with the same name already exists")
                return
            }
            else{
                collections.push({name})
                batch.set(userDocRef, {flashcards: collections}, {merge: true})
            }
        }
        else{ 
            batch.set(userDocRef, {flashcards: [{name}]})
        }

        const colRef = collection(userDocRef, name)
        flashcards.forEach((flashcard) => {
            const cardDocRef = doc(colRef)
            batch.set(cardDocRef, flashcard)
        })

        await batch.commit()
        handleClose()
        router.push('/flashcards')
    }

    return <Container maxWidth="md">
        <Box sx={{
        mt: 4, mb:6, display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}>
            <Typography variant="h4">Generate your FlashCard</Typography>
            <Paper sx={{ p:4, width:'100%'}}>
                <TextField value={text} onChange={(e) => setText(e.target.value)} label = "Enter text" fullWidth multiline />
            </Paper>
            <Button variant="contained" onClick={handleSubmit} fullWidth sx={{
                backgroundColor:"#f67676",
            }}>Submit</Button>
        </Box>
        {flashcards.length > 0 && (
            <Box sx={{mt: 4}}>
                <Typography variant="h5">FlashCard Preview</Typography> 
                <Grid container spacing={3}>
                    {flashcards.map((flashcard, index) =>{
                        <Grid item xs={12} sm={6} md={4} key = {index}> 
                        <CardActionArea onClick={() =>
                            handleCardClick(index)
                        }>
                            <CardContent>
                                <Box sx={{
                                    perspective: '1000px',
                                    '& > div': {
                                        transition: 'transform 0.6s',
                                        transformStyle: 'preserve-3d',
                                        position: 'relative',
                                        width: '100%',
                                        boxShadow: '0 4px 8px 0 rgba(0,0,0, 0.2)', 
                                        transform: flipped[index]
                                        ?'rotateY(180deg)'
                                        : 'rotateY(0deg)',
                                    }, 
                                    '& > div > div': {
                                        position: 'absolute',
                                        width: '100%',
                                        height: '100%',
                                        backfaceVisibility: 'hidden',
                                        display:'flex',
                                        alignItems:'center',
                                        padding: 2,
                                        boxSizing: 'border-box'
                                    }, 
                                    '& > div > div:nth-of-type(2)': {
                                        transform: 'rotateY(180)',
                                    },
                                }}>
                                    <div>
                                        <div>
                                            <Typography variant="h5" component={'div'}>
                                                {flashcard.front}
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography variant="h5" component={'div'}>
                                                {flashcard.back}
                                            </Typography>
                                        </div>
                                    </div>    
                                </Box>
                            </CardContent>
                        </CardActionArea></Grid>
                    })}
                </Grid>
                <Box sx={{ mt: 4, display:'flex', justifyContent:'center'}}>
                    <Button variant="contained" color='secondary' onClick={handleOpen}>
                        save
                    </Button>
                </Box>
            </Box>
        )}
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle> Save FlashCards</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter name of flashcards
                </DialogContentText>
                <TextField
                autoFocus
                margin='dense'
                label='collection name' 
                type="text"
                fullWidth
                value={name}
                onChange={(e) => setname(e.target.value)}
                variant="contained"/>
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
}