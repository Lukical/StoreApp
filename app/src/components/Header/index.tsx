import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import Select, { SingleValue } from 'react-select';

const Header: React.FC = () =>{
    const [menu, setMenu] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    interface IOption{
        value: string,
        label: string
    }

    const options: IOption[] = [
        {value: "logout", label: "sair"}
    ]

    const handleMenu = (selectedOption: SingleValue<IOption>) =>{

    }
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className={styles.header}>
            <div className={styles.div_name}>
                <h1 className={styles.nome}>Store</h1>
                <p className={styles.subnome}>App</p>
            </div>        
            <nav className={styles.nav}>
                <div className={styles.user_area}>
                    <div className={styles.div_cart} >
                        <FaShoppingCart className={styles.user_cart} size={25}/>
                        <p>1</p>
                    </div>
                    <div className={styles.div_user}>               
                        <FaUser className={styles.user_icon} size={25} onClick={()=>setMenu(!menu)} />
                    </div>
                </div>
                {menu &&(
                    <div className={styles.dropdown} ref={dropdownRef}>
                        <Select 
                            className={styles.menu}
                            options={options}
                            onChange={handleMenu}
                            isSearchable={false}
                            placeholder="Menu"
                            menuIsOpen={true}
                        />
                    </div>
                )}    
            </nav>        
        </nav>
    );
}
export default Header;