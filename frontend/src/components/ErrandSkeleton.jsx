import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';

function ErrandSkeleton() {
  return (
    <>
      <div className="errands-list">
        <Card className='skeleton-card'>
          <CardContent>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </CardContent>
        </Card>
        <Card className='skeleton-card'>
          <CardContent>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
          </CardContent>
        </Card>
      </div>
    </>
  )
  
}
export default ErrandSkeleton