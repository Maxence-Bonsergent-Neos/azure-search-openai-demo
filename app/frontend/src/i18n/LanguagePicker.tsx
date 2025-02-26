import { useId } from "@fluentui/react-hooks";
import { Globe24Regular } from "@fluentui/react-icons";
import { useTranslation } from "react-i18next";

import { supportedLngs } from "./config";
import styles from "./LanguagePicker.module.css";

interface Props {
    onLanguageChange: (language: string) => void;
}

export const LanguagePicker = ({ onLanguageChange }: Props) => {
    const { i18n } = useTranslation();

    const languagePickerId = useId("languagePicker");
    const otherLanguage = Object.entries(supportedLngs).find(([code]) => code !== i18n.language);
    const code = otherLanguage ? otherLanguage[0] : i18n.language;

    return (
        otherLanguage && (
            <div className={styles.languagePicker} onClick={() => onLanguageChange(code)}>
                <button key={code} className={code === i18n.language ? styles.selectedLanguage : styles.language} aria-labelledby={languagePickerId}>
                    <Globe24Regular aria-hidden="true" aria-label="Globe icon" primaryFill="#999999" />
                    {code.toLocaleUpperCase()}
                </button>
            </div>
        )
    );
};
