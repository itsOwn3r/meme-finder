import React from 'react'

const MemePage = ({ params }: { params: { id: string}}) => {
    console.log(params.id);
  return (
    <div>MemePage</div>
  )
}

export default MemePage;