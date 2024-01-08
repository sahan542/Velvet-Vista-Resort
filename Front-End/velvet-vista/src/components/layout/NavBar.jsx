import React from 'react'
import { NavLink } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className='navbar navbar-expand-lg bg-body-teriary px-5 shadow mt-5 sticky-top'>
        <div className='container-fluid'>
            <Link to={"/"}>
            <span className='hotel-color'>Velvet-Vista</span>
            </Link>
            <button
                className='navbar'
                type='button'
                data-bs-toggle='collapse'
                data-bs-target="#navbarScroll"
                aria-controls="navbarScroll"
                aria-expanded="false"
                aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>

            </button>
            <div className='collapse navbar-collapse' id="navbarScroll">
                <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll'>
                    <li className='nav-item'>
                        <NavLink className="nav-link" aria-current="page" to={"/browse-all-rooms"}>
                            Browse All Rooms
                        </NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink className="nav-link" aria-current="page" to={"/admin"}>
                            Admin
                        </NavLink>
                    </li>
                </ul>
                <ul className='d-flex navbar-nav'>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to={"/find-booking"}>
                            Find My Booking
                        </NavLink>
                    </li>
                </ul>
            </div>

        </div>

    </nav>
  )
}

export default NavBar