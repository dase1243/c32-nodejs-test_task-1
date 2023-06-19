import logo from "../../logo.svg";
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <a href="#" className="logo">
                        <img src={logo} alt="logo" className="logo-img"/>
                    </a>
                    <h1 className="header__title">Shorter URL</h1>
                </div>
            </div>
        </header>
    )
}
export default Header;