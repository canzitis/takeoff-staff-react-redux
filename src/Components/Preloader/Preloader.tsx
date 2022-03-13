import preloaderGif from "../../preloader/preloader.gif";
import s from "./Preloader.module.scss";

const Preloader = () => {
    return (
        <div className={s.preloader}>
           <img src={preloaderGif} alt='Загрузка...'/>
        </div>
    );
};

export default Preloader;
