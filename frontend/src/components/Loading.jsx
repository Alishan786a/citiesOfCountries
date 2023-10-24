import Spinner from 'react-bootstrap/Spinner';

function Loading() {
  return (
    <div className='d-flex justify-content-center align-items-center h-100 w-100 position-absolute'>

  
    <Spinner animation="border" role="status" >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </div>
  );
}

export default Loading;