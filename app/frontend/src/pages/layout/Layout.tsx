import { RefObject, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";
import { configApi } from "../../api";
import headerLogo from "../../assets/images/headerLogo.png";
import styles from "./Layout.module.css";

import { useLogin } from "../../authConfig";

import { LoginButton } from "../../components/LoginButton";
import { LanguagePicker } from "../../i18n";

const Layout = () => {
    const { i18n } = useTranslation();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef: RefObject<HTMLDivElement> = useRef(null);
    const [showLanguagePicker, setshowLanguagePicker] = useState<boolean>(false);

    const getConfig = async () => {
        configApi().then(config => {
            setshowLanguagePicker(config.showLanguagePicker);
        });
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    useEffect(() => {
        getConfig();
    }, []);

    return (
        <div className={styles.layout}>
            <header className={styles.header} role={"banner"}>
                <div className={styles.headerContainer} ref={menuRef}>
                    <Link to="/" className={styles.headerTitleContainer}>
                        <img src={headerLogo} alt="logo" className={styles.headerLogo} />
                    </Link>
                    <div className={styles.loginMenuContainer}>
                        {showLanguagePicker && <LanguagePicker onLanguageChange={newLang => i18n.changeLanguage(newLang)} />}
                        {useLogin && <LoginButton />}
                    </div>
                </div>
            </header>

            <Outlet />
        </div>
    );
};

export default Layout;
