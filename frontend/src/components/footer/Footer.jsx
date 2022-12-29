
import { IoLogoApple, } from "react-icons/io"
import logo from "../../assets/logo.svg"


const Footer = () => {
    return (
        <footer id="footer">
            <div className="left">
                <h1>Download our apps</h1>
                <div className="apps">
                    <IoLogoApple />
                    <label >Google Play Store</label>
                </div>
                <div className="apps">
                    <IoLogoApple />
                    <label >Apple App Store</label>
                </div>
            </div>


            <div className="center">
                <img src={logo}/>
                <h3>Always Best quality with best price</h3>
                <label >Copyright &copy; 2022 Ciseco</label>
            </div>


            <div className="right">
                <h1>Social Media</h1>
                <p>Facebook</p>
                <p>YouTube</p>
                <p>Twitter</p>
                <p>Instagram</p>
            </div>
        </footer>
    )
}
export default Footer;