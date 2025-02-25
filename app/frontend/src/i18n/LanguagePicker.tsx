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
    const { t } = useTranslation();

    return (
        <div className={styles.languagePicker}>
            {Object.entries(supportedLngs)
                .filter(([code]) => code !== i18n.language)
                .map(([code]) => (
                    <>
                        <button
                            key={code}
                            className={code === i18n.language ? styles.selectedLanguage : styles.language}
                            onClick={() => onLanguageChange(code)}
                            aria-labelledby={languagePickerId}
                        >
                            <Globe24Regular aria-hidden="true" aria-label="Globe icon" primaryFill="#999999" />
                            {code.toLocaleUpperCase()}
                        </button>
                    </>
                ))}
            {/* <Dropdown
                id={languagePickerId}
                selectedKey={i18n.language}
                options={Object.entries(supportedLngs).map(([code, details]) => ({
                    key: code,
                    text: details.name,
                    selected: code === i18n.language,
                    data: code
                }))}
                onChange={handleLanguageChange}
                ariaLabel={t("labels.languagePicker")}
            /> */}
        </div>
    );
};
