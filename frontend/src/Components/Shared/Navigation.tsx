import { Link } from "react-router-dom"
import './Navigation.css'

export default function Navigaton() {
    return (
        <header className="top-nav">
            <nav>
                <ul>
                    <li>
                        <Link to="/">List view</Link>
                    </li>
                    <li>
                        <Link to="/add-note">Add note</Link>
                    </li>
                    <li>
                        <Link to="/user-settings">User settings</Link>
                    </li>
                    <li>
                        <Link to="/logout">Log out</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}