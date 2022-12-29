import productImage from "../../assets/productimg.png";
// import { AiFillStar } from "react-icons/ai";
import "./Card.css"
const ProductCard = () => {
    return (
        <div className="product-card">
            <div className="card-image-div">
                <span className="stock-data">Stock Available</span>
                <img className="product-image" src={productImage} alt="product image" />
                <div className="hover-div">
                    <button>Add to Bag</button>
                    <button>View</button>
                </div>
            </div>

            <div className="product-detail">
                <h1>T shirt</h1>
                <p>Category: Laptop</p>
                <div className="price-rating">
                    <span className="price">$200.00</span>
                    <span className="rating">4.5(21 Reviews)</span>
                </div>
            </div>

        </div>
    )
}
export default ProductCard;