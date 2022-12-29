import { Link } from "react-router-dom"
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from 'react'
import logo from "../../assets/logo.svg"
const Header = () => {
    const [showSearch, setShowSearch] = useState(false);
    return (
        <nav>
            <img className="logo" src={logo} />
            <div className={`menu   ${showSearch ? 'menu-desktop-hide' : ''} `}>
                <Link to={"/"}>Home</Link>
                <Link to={"/"}>Home</Link>
                <Link to={"/"}>Home</Link>
                <Link to={"/"}>Home</Link>
            </div>
            <div className={`search-div   ${showSearch ? 'show-search-div' : ''} `}>
                <input type="text" placeholder="Search" />
                <div className="icons search-bar-icons">
                    <CiSearch style={showSearch ? { display: "inline" } : { display: "none" }} />
                    <AiOutlineClose style={showSearch ? { display: "inline" } : { display: "none" }} onClick={() => setShowSearch(!showSearch)} />
                </div>
            </div>
            <div className="icons">
                <CiSearch className={`${showSearch ? 'menu-desktop-hide' : ''} `} onClick={() => setShowSearch(!showSearch)} />
                <CiShoppingCart />
            </div>
        </nav>
    )
}
export default Header;