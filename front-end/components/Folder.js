import React from 'react'
import Link from 'next/link';
const Folder = props => (
    <li>
        <Link as={`/drive/${props.slug}/`} href={`/folder`}>
            <a>{props.title}</a>
        </Link>
    </li>
);

export default Folder