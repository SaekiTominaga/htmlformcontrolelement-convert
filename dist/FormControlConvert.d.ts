interface convertOptions {
    trim?: boolean;
    noBlankLine?: boolean;
    toHankakuEisu?: boolean;
    toZenkakuEisu?: boolean;
    toHankakuSpace?: boolean;
    combineSpace?: boolean;
    toLowerCase?: boolean;
    toUpperCase?: boolean;
}
interface convertTable {
    [key: string]: string;
}
/**
 * Converting input value of form control
 */
export default class {
    #private;
    /**
     * @param {HTMLInputElement | HTMLTextAreaElement} thisElement - Target element
     */
    constructor(thisElement: HTMLInputElement | HTMLTextAreaElement);
    /**
     * Perform the conversion
     *
     * @param {object} options - Specify the conversion type
     * @param {object} table - Proprietary conversion table (An associative array that specifies the character string before conversion as the key and the character string after conversion as the value)
     */
    convert(options?: convertOptions, table?: convertTable): void;
}
export {};
//# sourceMappingURL=FormControlConvert.d.ts.map