import { useContext, useState } from 'react';
import { LocalContext } from '../contexts/LocalContext';
import { useTranslation } from 'react-i18next';
import '../css/prevprojects.css'
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import Delete from '../components/Delete';
import { useUser } from '../contexts/UserProvider';
import { PORTFOLIOS } from '../api/Api';

import Grid from '@mui/material/Unstable_Grid2';
import AddIcon from '@mui/icons-material/Add';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function PrevProjects() {
  const { locale, setLocale } = useContext(LocalContext);
  const { t, i18n } = useTranslation();
  const { portfolio, setRunUseEffect } = useUser();
  const navigate = useNavigate();
  const { id } = useParams();

  //  ====== open && close delete state ========
  // const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  // const [rowToDelete, setRowToDelete] = useState(null);
  //  ====== open && close delete state ========

  // ================ delete function ================
  // function handleDeleteClick(event, id) {
  //   event.stopPropagation();
  //   event.preventDefault();
  //   setRowToDelete(id);
  //   setShowDeleteDialog(true);
  // }

  if (!portfolio) return null

  console.log("portfolio", portfolio)

  return (
    <div dir={locale === "en" ? "ltr" : "rtl"} className={[locale === "en" ? "ltr" : "rtl", "prevprojects"].join(" ")}>
      <div className="prevprojects-container">
        <Grid container columnSpacing={1} rowSpacing={3}>
          {portfolio.map((project, index) => (
            <Grid key={index} xs={12} md={6}>
              <NavLink style={{ position: 'relative'}} to={`/settings/${id}/prevProjects/${project?.id}/edit`}>
                <Card className='cardfullwidth' sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={project?.image_path}
                    title={project?.name}
                  />
                  <CardContent className='prev-project-content'>
                    <Typography gutterBottom variant="h5" component="div">
                      {project?.name}
                    </Typography>
                    <Typography className='prev-project-desc' variant="body2" color="text.secondary">
                      {project?.description}
                    </Typography>
                  </CardContent>
                  {/* <IconButton className='delete-icon-all-project' color='error' size="small" onClick={(event) => handleDeleteClick(event, project?.id)} >
                    <DeleteIcon color='error' fontSize='small' />
                  </IconButton> */}
                </Card>
                <div className='status-position'>{t(project?.status)}</div>
              </NavLink>
            </Grid>
          ))}
          <Grid xs={12} md={6}>
            <div className='add' onClick={() => navigate(`/settings/${id}/prevProjects/add`)}>
              <AddIcon sx={{ color: '#D47A3A', fontSize: 50 }} />
            </div>
          </Grid>
        </Grid>
      </div>
      {/* ================ delete dialog ================ */}
      {/* <Delete type={PORTFOLIOS} setShowDeleteDialog={setShowDeleteDialog} rowToDelete={rowToDelete} showDeleteDialog={showDeleteDialog} setRunUseEffect={setRunUseEffect} /> */}
      {/* ================ delete dialog ================ */}
    </div>
  )
}
