import { Grid, TextField, Typography } from "@material-ui/core";




export default function RequestDetailRow({ title, value }) {



    return <Grid container>
        <Grid item xs={12} sm={12} md={12} xl={12}>
            <TextField label={title} variant="outlined" size="medium" value={value} disabled fullWidth> </TextField>
        </Grid>
    </Grid>
}