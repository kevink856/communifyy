// Import dependencies
import "../styles/RightSlider.css"

/*
 * Component to scroll left and see previous top track / artist 
 */
const RightSlider = (props) => {
    return (
        <button className = "Right-slider"
            type = "button"
            onClick = {() => {
                props.slider === 4 ? props.setSlider(0) : props.setSlider(props.slider + 1);
            }}
        ></button>
    );
}

export default RightSlider;