import { CiSearch } from "react-icons/ci";
import slider1 from "../../assets/slider1.png"
import ProductCard from "../productCard/Card";

const sliderData = [{
    ptag: "In this season, find the best 🔥",
    h1tag: "Exclusive collection for everyone",
    img: slider1
}, {
    ptag: "In this season, find the best price 🔥",
    h1tag: "Exclusive collection for everyone",
    img: slider1
}]

const Home = () => {
    return (
        <>
            {/* slider part */}
            <div className="home-slider">
                <div className="first-slide-part">
                    <p>{sliderData[0].ptag}</p>
                    <h1>{sliderData[0].h1tag}</h1>
                    <button>Explore More <CiSearch /></button>
                </div>
                <div className="second-slide-part">
                    <img src={sliderData[0].img} alt="slider image" />
                </div>
            </div>

            {/* products */}
            <div className="featured-products">
                <ProductCard />
            </div>
        </>
    )
}

export default Home;