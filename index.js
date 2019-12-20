/**
 * @file mofron-effect-font/index.js
 : @brief set text font for mofron-comp-text component
 * @author simpart
 */
const comutl = mofron.util.common;

module.exports = class extends mofron.class.Effect {
    
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
     * @return (array) font name [primary, secondary]
     */
    family (p1, p2) {
        try {
	    if (0 === arguments.length) {
                /* getter */
		let ret = this.confmng("family");
                if ( (null === ret) || ("string" !== typeof ret[0]) ) {
                    throw new Error("invalid parameter");
		}
                return (undefined !== ret[1]) ? ret[0] + "," + ret[1] : ret[0];
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
     * setter/getter path to font
     * 
     * @param prm (string) path to font
     * @param prm (undefined) call as getter
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
     * enable text font
     *
     * @note private method
     */
    contents (cmp) {
        try {
            if (null !== this.path()) {
	        this.addFontFace();
            } 
            cmp.style({ 'font-family' : this.family() });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
