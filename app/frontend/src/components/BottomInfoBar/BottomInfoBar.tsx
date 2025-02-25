import { useTranslation } from "react-i18next";
import styles from "./BottomInfoBar.module.css";

export const BottomInfoBar = () => {
    const { t } = useTranslation();
    const replaceEmail = (text: string) => {
        const emailRegex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/g;
        return text.replace(emailRegex, email => `<a href="mailto:${email}">${email}</a>`);
    };
    const title = replaceEmail(t("labels.bottomInfoBar"));

    return <div className={`${styles.container}`} dangerouslySetInnerHTML={{ __html: title }}></div>;
};
