import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
            <Link className="navbar-brand ml-5" to="/">Phone Book</Link>
        </nav>
    )
}
