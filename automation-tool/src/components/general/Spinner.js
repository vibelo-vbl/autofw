// import "./Spinner.style.css";
import styles from "./Spinner.module.scss"
import { useState, useEffect } from "react";

function Spinner() {
    useEffect(() => {
        console.log("Spinner_mount");
        const clearFunction = () => {
            console.log("Spinner_unmount");
        };
        return clearFunction;
    }, []);

    return (
        <div className={styles.ldsSpinner}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default Spinner;