import classNames from "classnames";
import React, { useState } from "react";
import PlusIcon from "../../../assets/icons/plus-button.svg";
import Button from "../../atoms/Button";
import Image from "../../atoms/Image/index";
import Input from "../../atoms/Input/index";
import ListItem from "../ListItem";
import styles from "./style.module.css";

interface IProps {
  addRecipe(description: string): void;
}
const RecipeForm: React.FC<IProps> = ({ addRecipe }) => {
  const classProps = classNames(styles["default"]);
  const [inputValue, setInputValue] = useState<string>("");
  const onSubmit = () => {
    addRecipe(inputValue);
    setInputValue("");
  };

  return (
    <div className={classProps}>
      <ListItem key={"create-recipe"} className={styles["list-item"]}>
        <Input
          placeholder="Past raw recipe"
          value={inputValue}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setInputValue(event.target.value)}
        />
        <Button onClick={onSubmit}>
          <div className={styles["image-wrapper"]}>
            <Image src={PlusIcon} />
          </div>
        </Button>
      </ListItem>
    </div>
  );
};

export default RecipeForm;
