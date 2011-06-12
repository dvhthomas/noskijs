var noski;

if (!noski) noski = {};
else if (typeof noski != 'object') {
    throw new Error('noski already exists and is not an object');
}

if (!noski.core) noski.core = {};
else if (typeof noski.core != 'object') {
    throw new Error('noski.core already exists and is not an object');
}

noski.core = function () {
    return {

        /**
         * Trim leading white space from the front of a string
         * @param {string} str The string to trim.
         */
        ltrim: function (str) {
            return str.replace(/^\s\s*/, '');
        },

        /**
         * Trim leading white space from the end of a string
         * @param {string} str The string to trim.
         */
        rtrim: function (str) {
            return str.replace(/\s\s*$/, '');
        },

        /**
         * Trim leading and trailing white space from a string
         * @param {string} str The string to trim.
         */
        trim: function (str) {
            return this.rtrim(this.ltrim(str));
        }
    };
}();