import React, { useEffect, useState } from 'react';

import Strobe from 'components/Strobe';

const StrobePage = () => {
  return (
    <>
      <Strobe hasLighter={true} isUpper={true}></Strobe>
      <Strobe hasLighter={false} isUpper={false}></Strobe>
    </>
  );
}

export default StrobePage
