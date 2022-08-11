import React from "react";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./css";
import { Link } from "@material-ui/core";

const images = [
  {
    href: "https://aleriaconsulting.eu/software",
    url: window.location.origin + "/developpment.jpg",
    title: "Développement informatique",
    width: "30%",
  },
  {
    href: "https://aleriaconsulting.eu/web",
    url: "https://www.star-dev.net/wp-content/uploads/2016/07/3.jpg",
    title: "Création site web",
    width: "40%",
  },
  {
    href: "https://aleriaconsulting.eu/3d",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXRnejzE8afLjdRvvvNMgHJMeLAn8VAQxAcg&usqp=CAU",
    title: "Conception 3D",
    width: "30%",
  },
  {
    href: "https://aleriaconsulting.eu/marketing",
    url: "https://centralmarketing.org/wp-content/uploads/2021/04/marketing-digital-covid-19.png",
    title: "Marketing digital",
    width: "50%",
  },
  {
    href: "https://aleriaconsulting.eu/seo",
    url: "https://www.cadre-dirigeant-magazine.com/wp-content/uploads/2021/02/referencement-naturel-boostez-agence-votre.jpg",
    title: "Référencement",
    width: "50%",
  },
];

export default function Solution() {
  const classes = useStyles();

  return (
    <div>
      <Typography className={classes.MuiTypography} align="center" variant="h5">
        Nos Solutions
      </Typography>

      <div className={classes.root}>
        {images.map((image, index) => (
          <ButtonBase
            focusRipple
            key={index++}
            className={classes.image}
            focusVisibleClassName={classes.focusVisible}
            style={{
              width: image.width,
            }}
          >
            <span
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${image.url})`,
              }}
            />

            <span className={classes.imageBackdrop} />
            <span className={classes.imageButton}>
              <Link href={image.href} color="inherit">
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  className={classes.imageTitle}
                >
                  {image.title}
                  <span className={classes.imageMarked} />
                </Typography>
              </Link>
            </span>
          </ButtonBase>
        ))}
      </div>
    </div>
  );
}
