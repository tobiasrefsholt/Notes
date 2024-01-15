import { Link } from "react-router-dom"

export default function Navigaton() {
    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/add-task">Add note</Link>
                    </li>
                    <li>
                        <Link to="/logout">Log out</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}