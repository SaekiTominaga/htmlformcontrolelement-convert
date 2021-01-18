var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _LF, _thisElement;
/**
 * Converting input value of form control
 */
export default class {
    /**
     * @param {HTMLInputElement | HTMLTextAreaElement} thisElement - Target element
     */
    constructor(thisElement) {
        _LF.set(this, '\n'); // 改行コード・LF
        _thisElement.set(this, void 0); // 対象要素
        __classPrivateFieldSet(this, _thisElement, thisElement);
    }
    /**
     * Perform the conversion
     *
     * @param {object} options - Specify the conversion type
     * @param {object} table - Proprietary conversion table (An associative array that specifies the character string before conversion as the key and the character string after conversion as the value)
     */
    convert(options, table) {
        const changeEvent = () => {
            let value = __classPrivateFieldGet(this, _thisElement).value;
            if (options !== undefined) {
                if (options.trim) {
                    /* 両端の空白を削除 */
                    if (!value.includes(__classPrivateFieldGet(this, _LF))) {
                        value = value.trim();
                    }
                    else {
                        value = value
                            .trim()
                            .split(__classPrivateFieldGet(this, _LF))
                            .map((currentValue) => currentValue.trim())
                            .join(__classPrivateFieldGet(this, _LF));
                    }
                }
                if (options.noBlankLine) {
                    /* 空行を削除 */
                    value = value.replace(/\n+/g, __classPrivateFieldGet(this, _LF));
                }
                if (options.toHankakuEisu) {
                    /* 英数字を半角化 */
                    value = value.replace(/[ａ-ｚＡ-Ｚ０-９－]/g, (str) => String.fromCharCode(str.charCodeAt(0) - 0xfee0));
                }
                else if (options.toZenkakuEisu) {
                    /* 英数字を全角化 */
                    value = value.replace(/[a-zA-Z0-9-]/g, (str) => String.fromCharCode(str.charCodeAt(0) + 0xfee0));
                }
                if (options.toHankakuSpace) {
                    /* 全角スペースを半角化 */
                    value = value.replace(/\u3000/g, '\u0020');
                }
                if (options.combineSpace) {
                    /* 連続したスペースを統合 */
                    value = value.replace(/\u0020+/g, '\u0020');
                }
                if (options.toLowerCase) {
                    /* 小文字化 */
                    value = value.toLowerCase();
                }
                else if (options.toUpperCase) {
                    /* 大文字化 */
                    value = value.toUpperCase();
                }
            }
            if (table !== undefined) {
                /* 変換テーブルによる変換 */
                for (const key of Object.keys(table)) {
                    value = value.replace(key, table[key]);
                }
            }
            __classPrivateFieldGet(this, _thisElement).value = value;
        };
        __classPrivateFieldGet(this, _thisElement).addEventListener('change', changeEvent, { passive: true });
    }
}
_LF = new WeakMap(), _thisElement = new WeakMap();
//# sourceMappingURL=FormControlConvert.js.map