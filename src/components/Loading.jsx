import React, { Component } from "react";
import styles from "./Loading.module.css";

export default class Loading extends Component {
  render() {
    return (
      <div className={styles.loading}>
        <span className={styles.spinner}></span>
        <span>Loading...</span>
      </div>
    );
  }
}
