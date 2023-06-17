import classNames from "classnames";
import React from "react";
import Date, { Size as DateSize } from "../../atoms/Date";
import P, { Size } from "../../atoms/P";
import styles from "./style.module.css";

interface IProps {
  className?: string;
}

const Header: React.FC<IProps> = ({ className }) => {
  const classProps = classNames(className, styles["default"]);

  return (
    <div className={classProps}>
      <P text="Toucan" size={Size.extraLarge} className={styles["title"]} />
      <Date className={styles["date"]} size={DateSize.small} />
    </div>
  );
};

export default Header;
