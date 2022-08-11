import { useQuery } from '@apollo/client'
import { GET_COMPANY_BY_ID, GET_PANEL_BY_ID } from '../../../graphql/queries'
import { Grid, Typography, Paper, Divider, IconButton } from '@material-ui/core'
import RequestDetailRow from './request-detail-row'
import { convertDateToLocalDateFrench } from '../../util/date_fonrmater'
import { MdCancel } from 'react-icons/md'
import { Helmet } from 'react-helmet'
export default function RequestDetail({ request, setModal }) {
    const { data: companyData, error: companyError } = useQuery(GET_COMPANY_BY_ID, { variables: { id: request?.company_id } })
    const { data: panelData, error: panelError } = useQuery(GET_PANEL_BY_ID, { variables: { id: request?.panel_id } })



    return <>
        <Helmet>
            <title> Information de la requête de {request?.name_require}</title>
        </Helmet>
        <Grid item md={3} xl={3} />
        <Grid item xl={6} md={6} sm={12} xs={12}>
            <Paper style={{ padding: "1%" }}>
                <Grid container spacing={2}>

                    <Grid item xs={10} sm={10} xl={10} md={10}>
                        <Typography variant="inherit" component="h1"> Informations requête</Typography>
                    </Grid>
                    <Grid item xs={1} sm={1} xl={1} md={1}>
                        <IconButton onClick={() => setModal({ content: null, isShowing: false })}>
                            <MdCancel size={24} />
                        </IconButton>
                    </Grid>
                    <Paper style={{ padding: "2%", margin: "1%" }}>
                        <Grid container spacing={2} justifyContent="center" alignContent="center"  >
                            <Grid item xs={12} sm={12} xl={12} md={12}>
                                <Typography variant="inherit" component="h2"> Détail de la requête</Typography>
                            </Grid>

                            <Grid item xs={12} sm={12} xl={12} md={12}>
                                <Divider />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6} xl={6}>
                                <RequestDetailRow title="Nom du demandeur : " value={request?.name_require} />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6} xl={6}>
                                <RequestDetailRow title="Télèphone du  demandeur : " value={request?.phone_require} />
                            </Grid>


                            <Grid item xs={6} sm={6} md={6} xl={6}>
                                <RequestDetailRow title="E-mail du demandeur : " value={request?.email_requester} />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6} xl={6}>
                                <RequestDetailRow title="Raison social : " value={request?.social_reason} />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6} xl={6}>
                                <RequestDetailRow title="Date début : " value={convertDateToLocalDateFrench(request?.starting_date)} />
                            </Grid>


                            <Grid item xs={6} sm={6} md={6} xl={6}>
                                <RequestDetailRow title="Date fin : " value={convertDateToLocalDateFrench(request?.ending_date)} />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6} xl={6}>
                                <RequestDetailRow title="Message du demandeur : " value={request?.message} />
                            </Grid>


                            <Grid item xs={6} sm={6} md={6} xl={6}>
                                <RequestDetailRow title="Status : " value={request?.status} />
                            </Grid>


                        </Grid>
                    </Paper>

                    <Paper style={{ padding: "2%", margin: "1%" }}>
                        <Grid container spacing={2} justifyContent="center" alignContent="center"  >
                            <Grid item xs={12} sm={12} xl={12} md={12}>
                                <Typography variant="inherit" component="h2"> Détail du panneau</Typography>
                            </Grid>

                            <Grid item xs={12} sm={12} xl={12} md={12}>
                                <Divider />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6} xl={6}>
                                <RequestDetailRow title="Titre du panneau :" value={panelData?.getPanelById?.title} />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6} xl={6}>
                                <RequestDetailRow title="Pitch : " value={panelData?.getPanelById?.pitch} />
                            </Grid>


                            <Grid item xs={6} sm={6} md={6} xl={6}>
                                <RequestDetailRow title="Dimensions : " value={panelData?.getPanelById?.width + " X " + panelData?.getPanelById?.heigh} />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6} xl={6}>
                                <RequestDetailRow title="Prix Journalier : " value={panelData?.getPanelById?.day_price + " Dt/jour"} />
                            </Grid>

                        </Grid>
                    </Paper>

                    <Paper style={{ padding: "2%", margin: "1%" }}>
                        <Grid container spacing={2} justifyContent="center" alignContent="center"  >

                            <Grid item xs={12} sm={12} xl={12} md={12}>
                                <Typography variant="inherit" component="h2"> Détail propriétaire du panneau  </Typography>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} xl={6}>
                                <RequestDetailRow title="Nom de la companie : " value={Array.isArray(companyData?.getCompanyByID) ? companyData?.getCompanyByID[0]?.name : null} />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6} xl={6}>
                                <RequestDetailRow title="E-mail du  propirétaire : " value={Array.isArray(companyData?.getCompanyByID) ? companyData?.getCompanyByID[0]?.e_mail : null} />
                            </Grid>


                            <Grid item xs={6} sm={6} md={6} xl={6}>
                                <RequestDetailRow title="Télèphone du demandeur : " value={Array.isArray(companyData?.getCompanyByID) ? companyData?.getCompanyByID[0]?.phone : null} />
                            </Grid>

                            <Grid item xs={6} sm={6} md={6} xl={6}>
                                <RequestDetailRow title="Raison social : " value={Array.isArray(companyData?.getCompanyByID) ? companyData?.getCompanyByID[0]?.trade_register_number : null} />
                            </Grid>



                        </Grid>
                    </Paper>
                </Grid>
            </Paper>
        </Grid>
        <Grid item md={3} xl={3} />
    </>
}