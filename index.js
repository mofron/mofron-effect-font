/**
 * @file mofron-effect-font/index.js
 * @brief set text font for mofron-comp-text component
 *        format configure for each file automatically if you use local font
 * @attention this effect is private, this function is included in text component. so you don't need to use directly
 * @license MIT
 */
const comutl = mofron.util.common;

module.exports = class extends mofron.class.Effect {
    /**
     * initialize effect
     * 
     * @param (mixed) short-form parameter
     *                key-value: effect config
     * @short fname,path
     * @type private
     */
    constructor (prm) {
        try {
            super();
            this.name("Font");
            this.shortForm("fname", "path");
            /* init config */
	    this.confmng().add("fname", { type: "array" });
            this.confmng().add("path", { type: "string" });
            /* set config */
	    if (undefined !== prm) {
                this.config(prm);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * font name setter/getter
     *
     * @param (mixed) string: primary font name
     *                undefined: call as getter
     * @param (string) secondary font name
     * @return (array) font name [primary, secondary]
     */
    fname (p1, p2) {
        try {
	    if (0 === arguments.length) {
                /* getter */
		return this.confmng("fname");
	    }
	    /* setter */
	    if ( ("string" !== typeof p1) ||
	         ((undefined !== p2) && ("string" !== typeof p2)) ) {
                throw new Error("invalid parameter");
	    }
	    let set_val = [undefined,undefined];
	    set_val[0]  = (-1 !== p1.indexOf(" ")) ? "'" + p1 + "'" : p1;
	    set_val[1]  = (-1 !== p2.indexOf(" ")) ? "'" + p2 + "'" : p2;
	    this.confmng("fname", set_val);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * setter/getter path to font
     * 
     * @param (mixed) string: path to font
     *                undefined: call as getter
     * @return path to font
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
     * set font-face setting in style tag
     * 
     * @param (string) font-family value
     * @type private
     */
    addFontFace (fnm) {
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
	    val += "font-family:" + fnm + ",";
	    val += "src:" + "url('" + this.path() + "') " + format + "}";
	    comutl.addhead("style", { type: "text/css", test:"test" }, val);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    /**
     * set text font
     *
     * @param (mofron.class.Component) component object
     * @type private
     */
    contents (cmp) {
        try {
            let fname = this.fname();
            if (null === fname) {
                throw new Error("could not find font name config");
            }
	    let set_fnt = (undefined === fname[1]) ? fname[0] : fname[0]+','+fname[1];
            if (null !== this.path()) {
	        this.addFontFace(set_fnt);
            } 
            cmp.style({ 'font-family' : set_fnt });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
