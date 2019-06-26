import React from 'react'
import Link from 'next/link'

const linkStyle = {
    marginRight: 15
}

export default function Header() {
    return (
        <div>
            <Link href="/" >
                <a style={linkStyle}>Home</a>
            </Link>
            <Link href="/details/drive">
                <a style={linkStyle}>About</a>
            </Link>
        </div>
    )
}