import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

export default function App() {
    return (
        <MDBFooter className='text-center text-lg-left mt-auto'>
            <div className='text-center p-3 bg-dark'>
                &copy; {new Date().getFullYear()} Copyright:{' Mike Chirkov '}
                <a className='text-light' href='https://github.com/mikechirkov44'>
                    GitHub
                </a>
            </div>
        </MDBFooter>
    );
}