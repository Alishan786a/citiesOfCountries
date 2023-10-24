import React from 'react';
import { useRef } from 'react';
import Alert from 'react-bootstrap/Alert';

function ReactAlert({sms,color}) {
  return (
    <>
     
        <Alert  variant={color} className='' >
          {sms}
         
        </Alert>
     
    </>
  );
}

export default React.memo(ReactAlert);