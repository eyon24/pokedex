import { Link } from "react-router-dom";
import "../css/notfound.css";
import sadPikachu from "../images/crying-pika.gif";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="image-container">
        <img src={sadPikachu} alt="" />
      </div>
      <div className="content">
        <h2>Sorry</h2>
        <p>That page cannot be found</p>
        <Link className="link" to="/">
          Back to the hompage...
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
