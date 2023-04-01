import ComponentProps from "../Types/ComponentProps";
import styled from "styled-components";
import PhotoType from "../Types/PhotoType";
import { useState } from "react";
import { Box, Fade, Modal, Typography } from "@mui/material";

interface PhotoCardProps extends ComponentProps { photo: PhotoType | undefined } // TODO remove undefined

const PhotoCard = ({ theme, photo }: PhotoCardProps): JSX.Element => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return <CardContainer theme={theme}>
    <img src={photo?.url} onClick={handleOpen} style={{ borderRadius: "inherit", width: "100%" }} />

    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-explanation"
    >
      <Fade in={open}>
        <BoxStyled theme={theme}>
          <Typography id="modal-title" variant="h6" component="h2" children={photo?.title} />
          <Typography id="modal-explanation" sx={{ mt: 2 }} children={photo?.explanation} />
        </BoxStyled>
      </Fade>
    </Modal>
  </CardContainer>
}

const BoxStyled = styled(Box) <ComponentProps>`
    position: absolute;
    overflow-y: scroll;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    max-height: 80%;
    border-radius: 1.5rem;
    background-color: ${props => props.theme.accentDark};
    color: ${props => props.theme.text};
    padding: 40px 25px 40px 25px;
    outline: none;
    text-align: center;

    &::-webkit-scrollbar {
        background-color: transparent;
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${props => props.theme.accentLight};
      border-radius: 1rem;
    }
`

const CardContainer = styled.figure`
    position: relative;
    overflow: hidden;
    border-radius: 1.5rem;
    width: 90%;
    display: flex;
    cursor: pointer;
    
    & > img {
    }
`;

export default PhotoCard;