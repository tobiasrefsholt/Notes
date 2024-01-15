import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { redirectDocument, useNavigate } from 'react-router-dom';

export default function SingleNote() {
    return(
        <div className='dashboard-sigle-note'>

            <h1>This is a heading</h1>
            <p>And this is a paragrath</p>
        </div>
    );
}