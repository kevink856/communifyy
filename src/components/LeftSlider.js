// Import dependencies
import "../styles/LeftSlider.css"

/*
 * Component to scroll left and see previous top track / artist 
 */
const LeftSlider = (props) => {
    return (
        <button className = "Left-slider"
            type = "button"
            onClick = {() => {
                props.slider === 0 ? props.setSlider(4) : props.setSlider(props.slider - 1);
            }}
        ></button>
    );
}

export default LeftSlider;