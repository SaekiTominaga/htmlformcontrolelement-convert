interface convertOptions {
	trim?: boolean; // Remove whitespace at both ends
	noBlankLine?: boolean; // Delete blank lines
	toHankakuEisu?: boolean; // Make alphanumeric characters half-width (Only one of `toHankakuEisu` and toZenkakuEisu` can be specified)
	toZenkakuEisu?: boolean; // Make alphanumeric characters full-width (Only one of `toHankakuEisu` and toZenkakuEisu` can be specified)
	toHankakuSpace?: boolean; // Make full-width space half-width
	combineSpace?: boolean; // Consolidate contiguous spaces
	toLowerCase?: boolean; // Make the alphabet lowercase (Only one of `toLowerCase` and `toUpperCase` can be specified)
	toUpperCase?: boolean; // Make the alphabet uppercase (Only one of `toLowerCase` and `toUpperCase` can be specified)
}

interface convertTable {
	[key: string]: string;
}

/**
 * Converting input value of form control
 */
export default class {
	readonly #LF = '\n'; // 改行コード・LF

	#thisElement: HTMLInputElement | HTMLTextAreaElement; // 対象要素

	/**
	 * @param {HTMLInputElement | HTMLTextAreaElement} thisElement - Target element
	 */
	constructor(thisElement: HTMLInputElement | HTMLTextAreaElement) {
		this.#thisElement = thisElement;
	}

	/**
	 * Perform the conversion
	 *
	 * @param {object} options - Specify the conversion type
	 * @param {object} table - Proprietary conversion table (An associative array that specifies the character string before conversion as the key and the character string after conversion as the value)
	 */
	convert(options?: convertOptions, table?: convertTable): void {
		const changeEvent = () => {
			let value = this.#thisElement.value;

			if (options !== undefined) {
				if (options.trim) {
					/* 両端の空白を削除 */
					if (!value.includes(this.#LF)) {
						value = value.trim();
					} else {
						value = value
							.trim()
							.split(this.#LF)
							.map((currentValue) => currentValue.trim())
							.join(this.#LF);
					}
				}

				if (options.noBlankLine) {
					/* 空行を削除 */
					value = value.replace(/\n+/g, this.#LF);
				}

				if (options.toHankakuEisu) {
					/* 英数字を半角化 */
					value = value.replace(/[ａ-ｚＡ-Ｚ０-９－]/g, (str) => String.fromCharCode(str.charCodeAt(0) - 0xfee0));
				} else if (options.toZenkakuEisu) {
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
				} else if (options.toUpperCase) {
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

			this.#thisElement.value = value;
		};

		this.#thisElement.addEventListener('change', changeEvent, { passive: true });
	}
}
