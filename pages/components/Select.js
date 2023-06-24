import { useState, useEffect, useRef } from "react";
import style from "./select.module.css";

export default function Select({
    options = [
        { id: 0, label: "Item 1" },
        { id: 1, label: "Item 2" },
        { id: 2, label: "Item 3" },
    ],
    selected = 0,
    changeSelection,
    width = 200,
    directionShow = "bottom",
    value = "",
}) {
    const [visibility, setVisibility] = useState("none");
    const [isHovered, setIsHovered] = useState(
        options.map((e) => (e.id === selected ? true : false))
    );
    const [selectedOption, setSelectedOption] = useState(options[selected].id);
    const selectRef = useRef(null);
    const optionsRef = useRef(null);

    const selectedItemMenu = () => {
        visibility === "none" ? setVisibility("block") : setVisibility("none");
        changeHover(selectedOption);
        selectRef.current.focus();
    };

    const callbackOption = (id) => {
        return () => {
            setSelectedOption(id);
            if (changeSelection)
                changeSelection(options[id].value ?? options[id].label);
        };
    };

    const hideMenu = (e) => {
        if (e.target !== selectRef.current) {
            setVisibility("none");
        }
    };

    const hoverOption = (id) => {
        return () => {
            changeHover(id);
        };
    };

    const setMenuDirectionShow = () => {
        if (directionShow === "top") {
            return { display: visibility, width, bottom: "48px" };
        }

        return { display: visibility, width, top: "48px" };
    };

    const handleKeyPress = (e) => {
        let id = isHovered.indexOf(true);

        if (e.key === "ArrowUp") {
            e.preventDefault();
            id = id === 0 ? id : id - 1;
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            id = id === optionsRef.current.children.length - 1 ? id : id + 1;
        } else if (e.key === "Enter" || e.key === "Escape") {
            setVisibility(visibility === "none" ? "block" : "none");
        }

        changeHover(id);
        setSelectedOption(id);
    };

    const changeHover = (id) => {
        setIsHovered(
            isHovered.map((_, i) => {
                if (i === id) return true;
                else return false;
            })
        );
    };

    useEffect(() => {
        document.addEventListener("click", hideMenu);
        return () => {
            document.removeEventListener("click", hideMenu);
        };
    }, [visibility]);

    useEffect(() => {
        if (changeSelection)
            changeSelection(options[selected].value ?? options[selected].label);
    }, []);

    useEffect(() => {
        if (value === "") {
            setSelectedOption(options[selected].id);
            changeSelection(options[selected].value ?? options[selected].label);
        }
    }, [value]);

    return (
        <div className={style.select}>
            <div
                className={style.selected_item}
                tabIndex={0}
                ref={selectRef}
                style={{ width }}
                onClick={selectedItemMenu}
                onKeyDown={handleKeyPress}
            >
                {options[selectedOption].label}
            </div>
            <div
                className={style.select_options}
                style={setMenuDirectionShow()}
            >
                <ul ref={optionsRef} draggable="false">
                    {options.map((item) => {
                        return (
                            <li
                                className={
                                    isHovered[item.id] === true
                                        ? style.select_option_hover
                                        : ""
                                }
                                key={item.label}
                                onClick={callbackOption(item.id)}
                                onMouseOver={hoverOption(item.id)}
                            >
                                {item.label}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
