import { Container } from "@mantine/core";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="header">
            <Container>
                <nav className="nav">
                    <ul className="nav_list">
                        <li className="nav_item">
                            <Link className="nav_link" to="">List</Link>
                        </li>
                        <li className="nav_item">
                            <Link className="nav_link" to="/create">Create</Link>
                        </li>
                    </ul>
                </nav>
            </Container>
        </div>
    )
};

export default Header;
