import {
  Grid,
  Paper,
  Typography,
  Button,
  Divider,
  CircularProgress,
  Input,
} from "@material-ui/core";
import { useState } from "react";
import config from "../../../config.json";
import { modal } from "../../../recoils/modal.atom";
import { useRecoilState } from "recoil";
import { useSnackbar } from "../../../context/use-snackbar.hook";
var confs;
if (process.env.REACT_APP_MILIEU !== "PROD") confs = config.dev;
else confs = config.prod;

export default function PanelImageUploader({ panel }) {
  const snackbar = useSnackbar()
  const [, setModal] = useRecoilState(modal);
  const [image, setIamge] = useState({ image: null });
  const [imageUploading, setImageUploading] = useState(false);
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setIamge({
        ...{
          image: URL.createObjectURL(event.target.files[0]),
          path: event.target.files[0],
        },
      });
    }
  };

  const handleSubmit = async () => {
    setImageUploading(true);
    const formData = new FormData();
    formData.append("file", image.path);
    formData.append("id", panel?.data?.insertPanel?._id);

    await fetch(confs.route.FILE_MS_ADDRESS, {
      method: "POST",
      mode: "no-cors",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((value) => {
        setModal({ isShowing: false, content: null });
        setImageUploading(false);
      })
      .catch((error) => {
        setImageUploading(false);
        console.log(error);
        snackbar.error("Erreur interne veuillez contacter l'équipe de support");

      });
  };

  return (
    <>
      <Grid item md={3} xl={3} />
      <Grid item xs={12} sm={12} md={6} xl={6}>
        <Paper>
          <Grid
            spacing={2}
            container
            alignContent="center"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} sm={12} md={12} xl={12} zeroMinWidth>
              <Typography variant="subtitle1">
                Upload l'image du tableau
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} xl={12} zeroMinWidth>
              <Divider />
            </Grid>

            <Grid item xs={12} sm={12} md={4} xl={4} zeroMinWidth>
              <Input
                fullWidth
                disableUnderline
                color="primary"
                type="file"
                onChange={onImageChange}
                id="file"
                name="file"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} xl={4} zeroMinWidth />

            <Grid item xs={12} sm={12} md={4} xl={4} zeroMinWidth>
              {imageUploading ? (
                <CircularProgress color="secondary" />
              ) : (
                <Button
                  type="submit"
                  color="primary"
                  variant="text"
                  onClick={handleSubmit}
                >
                  Soumettre
                </Button>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={1} xl={1} zeroMinWidth />

            <Grid item xs={12} sm={12} md={10} xl={10}>
              <img
                style={{ maxWidth: "100%", margin: "auto" }}
                id="target"
                alt=""
                src={image.image}
                enctype="multipart/form-data"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={1} xl={1} zeroMinWidth />
          </Grid>
        </Paper>
      </Grid>
      <Grid item md={3} xl={3} />
    </>
  );
}
