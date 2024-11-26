import LoadingIcon from '../../assets/gif/loading-gif.gif'
import '../../assets/css/Component/Loading.css'
const Loading = () => {
    return (
        <div className="loading-container">
            <div className="loading-content">
                <img src={LoadingIcon} alt="Loading..."/>
            </div>
        </div>
    )
}
export default Loading;