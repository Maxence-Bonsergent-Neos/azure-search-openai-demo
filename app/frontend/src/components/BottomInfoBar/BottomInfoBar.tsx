import { useTranslation } from "react-i18next";
import styles from "./BottomInfoBar.module.css";

export const BottomInfoBar = () => {
    const { t } = useTranslation();
    return <div className={`${styles.container}`}>{t("labels.bottomInfoBar")}</div>;
};
