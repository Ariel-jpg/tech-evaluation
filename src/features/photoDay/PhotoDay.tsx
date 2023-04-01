import { useState, useEffect } from "react";
import styled from "styled-components";
import NasaLogo from "../common/components/NasaLogo";
import PhotoCard from "../common/components/PhotoCard";
import ComponentProps from "../common/Types/ComponentProps";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PhotoType from "../common/Types/PhotoType";
import { getPhotoDay } from "../common/utils/http";

interface PhotoDayProps extends ComponentProps {

}



const PhotoDay = ({ theme }: PhotoDayProps): JSX.Element => {

    const today = (new Date(Date.now())).toISOString().substring(0, 10);

    const [newDate, setNewDate] = useState<string>("2022-10-01");
    const [open, setOpen] = useState(false);

    const [photo, setPhoto] = useState<PhotoType>();
    const [todayPhoto, setTodayPhoto] = useState<PhotoType>();

    const handleGetPhotoDay = (date: string, setDate: React.Dispatch<React.SetStateAction<PhotoType | undefined>>) => {
        getPhotoDay(date)
            .then(({ url, explanation, date, title }) => setDate({ url, explanation, date, title }))
            .catch(e => console.warn(e))

    }

    useEffect(() => {
        handleGetPhotoDay(today, setTodayPhoto);
        handleGetPhotoDay(newDate, setPhoto);
    }, [])

    return <PhotoDayWrapper theme={theme}>
        <section>
            <h2>El cosmos hoy</h2>
            <PhotoCard theme={theme} photo={todayPhoto} />
        </section>

        <NasaLogo />

        <section>
            <h2>El cosmos el día: {photo?.date}</h2>
            <PhotoCard theme={theme} photo={photo} />
        </section>

        <span>
            ¿Querés ver el cosmos en otro día? <br />
            <Button style={{ color: "white", textDecoration: "underline" }} onClick={() => setOpen(true)}>Cambiar de día</Button>
        </span>

        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Seleccionar día</DialogTitle>
            <DialogContent style={{ display: "flex" }}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    type="date"
                    fullWidth
                    variant="outlined"
                    onChange={e => setNewDate(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { setOpen(false); handleGetPhotoDay(newDate, setPhoto); }}>Enviar</Button>
            </DialogActions>
        </Dialog>
    </PhotoDayWrapper>
}

const PhotoDayWrapper = styled.main<ComponentProps>`
    width: 100vw;
    height: 100vh;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};

    display: flex;
    justify-content: space-evenly;
    align-items: center;

    & > section { 
        display: flex; 
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        flex: 0.5;
        transform: translateY(-5%);
        height: 80%;
    }

    & > section > h2 { font-weight: normal; }

    & > span {
        text-align: center;
        position: absolute;
        bottom: 5%;
    }

    @media (max-width: 1024px){
        flex-direction: column;
        min-height: 100vh;
        height: 100%;

        & > section { transform: translateY(0); }
        & > span {
            position: relative;
            bottom: 0;
        }
    }
`;

export default PhotoDay;