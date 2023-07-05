import { useRef } from "react";

export default function Pager({ pager, changeUrl, orderData }) {
    /* 
        "previousPage": "",
        "nextPage": "http://localhost:3000/api/?page=2",
        "filters": "",
        "totalPages": 2,
        "page": 1,
    */

    const pagerContainer = useRef();
    const paginas = Array.from(
        { length: pager?.totalPages },
        (_, index) => index + 1
    );
    const activeStyle = "2px solid #ffd90090";
    const activeFontWeight = 600;

    const generateFetch = (page) => {
        changeUrl({ page: page });
    };

    const setActive = (page) => {
        const childs = pagerContainer.current.children;

        if (page) {
            for (let child of childs) {
                child.style = "";
            }

            childs[page].style.outline = activeStyle;
            childs[page].style.fontWeight = activeFontWeight;
        }
    };

    const createLink = (page) => {
        return () => {
            setActive(page);
            if (page) generateFetch(page);
        };
    };

    return (
        <div className="pager__container" ref={pagerContainer}>
            <button id="pager_start" onClick={createLink(pager?.previousPage)}>
                ◂
            </button>
            {paginas.map((pagina) => {
                return (
                    <button
                        key={"pager_" + pagina}
                        onClick={createLink(pagina)}
                        style={
                            pagina === 1
                                ? {
                                      outline: activeStyle,
                                      fontWeight: activeFontWeight,
                                  }
                                : {}
                        }
                    >
                        {pagina}
                    </button>
                );
            })}
            <button id="pager_end" onClick={createLink(pager?.nextPage)}>
                ▸
            </button>
        </div>
    );
}
