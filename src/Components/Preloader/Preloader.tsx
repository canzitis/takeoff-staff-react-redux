import preloaderGif from "/images/preloader/preloader.gif";
import s from "./Preloader.module.css";

const Preloader = () => {
    return (
        <div className={s.preloader}>
           <img src={preloaderGif} alt='Загрузка...'/>
        </div>
    );
};

export default Preloader;
