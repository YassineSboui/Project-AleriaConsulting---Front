import React from "react";
import Modal from "@material-ui/core/Modal";
import { useRecoilState } from "recoil";
import { modal } from "../../recoils/modal.atom";
import { Container, Grid } from "@material-ui/core";
export default function OverlayPanel() {
  const [isShowing, setIsShowing] = useRecoilState(modal);
  return (
    <Container maxWidth="sm">
      <Modal
        open={isShowing.isShowing}
        title="Title"
        onClose={() => setIsShowing({ ...{ isShowing: false } })}
        style={{ marginTop: "2%", overflow: "scroll" }}
      >
        <Grid container alignContent="center">
          {isShowing?.content ? isShowing.content : null}
        </Grid>
      </Modal>
    </Container>
  );
}
