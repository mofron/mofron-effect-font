/**
 * @file mofron-effect-font/index.js
 * @brief text font for mofron-comp-text component
 *        format configure for each file automatically if you use local font
 * @attention this effect is private, this function is included in text component. so you don't need to use directly
 * @author simpart
 */
const comutl = mofron.util.common;

module.exports = class extends mofron.class.Effect {
    /**
     * constructor
     * 
     * @param (mixed) text,conf-arg: font family
     *                object: effect config
     * @param (string) font path
     * @short family,path
     * @type private
     */
    constructor (p1,p2) {
        try {
            super();
            this.name("Font");
            
	    this.confmng().add("family", { type: "array" });
            this.confmng().add("path", { type: "string" });

            this.shortForm("family", "path");
	    if (0 < arguments.length) {
                this.config(p1,p2);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * setter/getter font name
     *
     * @param (string) primary font name
     * @param (string) secondary font name
     * @return (mixed) string: font name
     *                 array: [primary, secondary]
     * @type parameter
     */
    family (p1, p2) {
        try {
	    if (0 === arguments.length) {
                /* getter */
		let ret = this.confmng("family");
                if ( (null === ret) || ("string" !== typeof ret[0]) ) {
                    throw new Error("invalid parameter");
		}
                return (undefined !== ret[1]) ? ret : ret[0];
	    }
	    /* setter */
	    if (("string" !== typeof p1) || ((undefined !== p2) && ("string" !== typeof p2)) ) {
                throw new Error("invalid parameter");
	    }
	    return this.confmng("family", [p1,p2]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * setter/getter path to font file for local font
     * 
     * @param (string) path to font file
     * @return (string) path to font
     * @type parameter
     */
    path (prm) {
        try {
	    return this.confmng("path", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    /**
     * add font-face to style in head tag
     * set format value every file type
     * 
     * @type private
     */
    addFontFace () {
        try {
            /* format */
            let pth_spt = this.path().split('.');
            let format  = '';
            if ('woff' === pth_spt[pth_spt.length-1]) {
                format = "format('woff')";
            } else if ('ttf' === pth_spt[pth_spt.length-1]) {
                format = "format('truetype')";
            } else if ('otf' === pth_spt[pth_spt.length-1]) {
                format = "format('opentype')";
            } else if ('eot' === pth_spt[pth_spt.length-1]) {
                format = "format('embedded-opentype')";
            } else if ( ('svg' === pth_spt[pth_spt.length-1]) || ('svgz' === pth_spt[pth_spt.length-1])) {
                format = "format('svg')";
            }
	    let val = "@font-face {";
	    val += "font-family:" + this.confmng().get("family")[0] + ",";
	    val += "src:" + "url('" + this.path() + "') " + format + "}";
	    comutl.addhead("style", { type: "text/css" }, val);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    /**
     * set text font
     * 
     * @param (component) target component object
     * @type private
     */
    contents (cmp) {
        try {
            if (null !== this.path()) {
	        this.addFontFace();
            }
	    let fm      = this.family();
	    let set_val = (true === Array.isArray(fm)) ? fm[0]+','+fm[1] : fm;
            cmp.style({ 'font-family' : set_val });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
