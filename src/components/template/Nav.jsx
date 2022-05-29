import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props => {
    const createNav = (ref, msg, inf) => {
        if (inf) {
            return <Link to={ref}>
                <i className={`fa fa-${inf}`}></i> {msg}
            </Link>
        } else { return <Link to={ref}>{msg}</Link> }
    }
    
    return (
        <aside className="menu-area">
            <nav className='menu'>
                {createNav('/', 'Início', 'home')}
                {createNav('/users', 'Eventos', 'users')}
                {createNav('/tickets', 'Ingressos')}
                {createNav('/about', 'Sobre Nós')}
            </nav>
        </aside>
        )}