'use strict';

import crypto from 'crypto';

import React from 'react';
import ReactDOM from 'react-dom';

import Notes from 'components/Notes';


const cards = [
    {
        uuid: '4aca821c-2676-4015-a6e4-48f42a003c39'
    },
    {
        uuid:'646d2de3-8103-47c4-b604-48229eb87fe8'
    },
    {
        uuid:'0c163d83-2f79-4838-bd48-15f9247ba476'
    }
];


/* const cipher = crypto.createCipher('aes192', 'a password');
 * 
 * let encrypted = '';
 * cipher.on('readable', () => {
 *     const data = cipher.read();
 *     if (data)
 *         encrypted += data.toString('hex');
 * });
 * cipher.on('end', () => {
 *     console.log(encrypted);
 *     // Prints: ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504
 * });
 * 
 * cipher.write('some clear text data');
 * cipher.end();
 * 
 * 
 * const decipher = crypto.createDecipher('aes192', 'a password');
 * 
 * let decrypted = '';
 * decipher.on('readable', () => {
 *     const data = decipher.read();
 *     if (data)
 *         decrypted += data.toString('utf8');
 * });
 * decipher.on('end', () => {
 *     console.log(decrypted);
 *     // Prints: some clear text data
 * });
 * 
 * //const encrypted = 'ca981be48e90867604588e75d04feabb63cc007a8f8ad89b10616ed84d815504';
 * decipher.write(encrypted, 'hex');
 * decipher.end();
 * */

ReactDOM.render(
    <Notes
        cards={cards}
        password='password' />,
    document.getElementById('main-table')
);
