import React from 'react'

function ErrandItem({errand}) {
  return (
    <div className="errand">
        <div>
            { new Date(errand.createdAt).toLocaleString('en-US') }
        </div>
    </div>
  )
}

export default ErrandItem