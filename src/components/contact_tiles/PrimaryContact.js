import {useState} from 'react';
import {Input, Button} from 'reactstrap';
import PropTypes from 'prop-types';
import {functions} from '../../project/Firebase';
import {httpsCallable} from 'firebase/functions';

function PrimaryContact(props) {
  /* const contactEmail = 'ncgraham@hotmail.co.uk'; */
  const contactEmail = 'jamesmccorkindale0@gmail.com';

  const [email, setEmail] = useState();
  const [subject, setSubject] = useState();
  const [message, setMessage] = useState();

  return (
    <>
      <div className="row text-bg-light p-3 p-md-5 m-md-3 overflow-hidden text-center">

        <div className="col-lg-6 p-lg-5 mx-auto my-5" > {/* my-3 py-3 mx-auto*/}
          <h1 className="display-4 fw-normal">Contact Us</h1>
          <p className="lead fw-normal">Get in touch with us</p>
          <div className="mx-auto">
            <p className="lead fw-normal mb-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
              {/* Change number and email*/}
            </svg> 07951 806783</p>
            <p className="lead fw-normal"><svg style={{}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
            </svg> {contactEmail}</p>
            <a href={props.socials ? props.socials.facebook : ''} target="_blank" className="text-decoration-none me-3" rel="noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="25">
                <path fill='rgb(56, 88, 152)' d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/>
              </svg>
            </a>
            <a href={props.socials ? props.socials.twitter : ''} target="_blank" className="text-decoration-none me-3" rel="noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="25">
                <path fill="rgb(29, 155, 240)" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/>
              </svg>
            </a>
            <a href={props.socials ? props.socials.instagram : ''} target="_blank" className="text-decoration-none me-3" rel="noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="25">
                <path fill="rgb(225, 48, 108)" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
              </svg>
            </a>
          </div>
        </div>

        <form className='col-lg-6 bg-dark rounded p-4' onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}>
          <Input type='email' placeholder='Email' className='my-3' value={email} onChange={(e) => {
            setEmail(e);
          }} required/>
          <Input type='text' placeholder='Subject' className='my-3' value={subject} onChange={(e) => {
            setSubject(e);
          }} required/>
          <textarea className="form-control my-3" placeholder='Message' rows="4" value={message} onChange={(e) => {
            setMessage(e);
          }} required></textarea>
          <Button color='secondary' className='w-100 mb-0'>Submit</Button>
          <p className='text-success text-center mt-3 d-none' id='contact-response'>Thank you for getting in touch!<br/>We will respond as soon as possible.</p>
        </form>

      </div>
    </>
  );

  function submit() {
    const sendContactEmail = httpsCallable(functions, 'sendContactEmail ');
    sendContactEmail({to: contactEmail, subject: subject, email: email, message: message});
    document.querySelector('#contact-response').classList.remove('d-none');
    setEmail('');
    setSubject('');
    setMessage('');
  }
}

PrimaryContact.propTypes = {
  socials: PropTypes.object.isRequired,
};

export default PrimaryContact;
