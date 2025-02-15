import "./dmpcom.css";
import Expdp from "./expdp.js";
import Impdp from "./impdp.js";
import { useState } from "react";

const Dmpcom = () => {
  
    // タブ表示フラグ
    const [expdpFlg, setExpdpFlg] = useState(true);

    // タブ表示項目編集
    const tabContents = [
        { text: "expdp", path: "/expdp", flg: expdpFlg},
        { text: "impdp", path: "/impdp", flg: !expdpFlg}
    ]

    return (
        <>
            <h3>Data Pump コマンド作成ツール</h3>
            <div className="main-content">
                <div className="tab-wrap">
                    {tabContents.map((tabContents, index) => (
                        <div key={index} onClick={() => {
                            if(!tabContents.flg){
                                setExpdpFlg(!expdpFlg);
                            }
                        }}
                        className={`tab ${tabContents.flg ? "contents-selected" : ""}`}>
                            {tabContents.text}
                        </div>
                    ))}
                </div>
                <div className="main-wrap">{expdpFlg ? <Expdp /> : <Impdp />}</div>
            </div>
        </>
    )
};

export default Dmpcom;