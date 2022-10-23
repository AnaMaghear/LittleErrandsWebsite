import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

function ErrandItem({errand}) {
  const navigate = useNavigate()

  const gotoErrand = () => {
    navigate(`/errand/${errand._id}`)
  }

  return (
    <div className='card'>
      <Card id="cardcolor" onClick={gotoErrand}>
        <CardContent>
          <Typography variant="h5" component="div">
          {errand.title.length > 25 ? errand.title.slice(0, 23) + "..." : errand.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            by {errand.user}
          </Typography>
          <Typography variant="body2">
            {errand.description.length > 100 ? errand.description.slice(0, 98) + "..." : errand.description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default ErrandItem