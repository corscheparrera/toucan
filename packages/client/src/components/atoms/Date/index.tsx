import classNames from "classnames";
import React from "react";

import styles from "./style.module.css";

interface IProps {
  className?: string;
  size?: Size;
}

export enum Size {
  small = 12,
  regular = 16,
  large = 20,
  extraLarge = 30
}

const date: React.FC<IProps> = ({ className, size = Size.regular }) => {
  const classProps = classNames(className, styles["default"]);
  const style = {
    fontSize: size
  };

  const date = new Date();
  const dayTable = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <div className={classProps}>
      <span style={style} className={styles["day"]}>
        {dayTable[date.getDay()]},
      </span>
      <span style={style} className={styles["month"]}>
        month {date.getMonth() + 1}
      </span>
      <span style={style} className={styles["date"]}>
        day {date.getDate()}
      </span>
    </div>
  );
};

export default date;
