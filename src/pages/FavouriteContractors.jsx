import React, { useContext } from 'react'
import { LocalContext } from '../contexts/LocalContext'
import CardContractor from '../components/CardContractor'
import { useFavorite } from '../contexts/FavouriteProvider'
import "../css/favourite.css"

import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";

const FavouriteContractors = () => {
    const { favorites } = useFavorite();
    const { locale, setLocale } = useContext(LocalContext);
    return (
        <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "favouritecontractors"].join(" ")}>
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    {favorites.map(user => (
                        <Grid sx={{ textAlign: "center" }} xs={6} md={3} key={user.id}>
                            <CardContractor user={user} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    )
}

export default FavouriteContractors
