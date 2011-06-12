var FOO = function() {
    return {
        mammal: function(spec, my) {
            var that = {};
            spec = spec || {};
            my = my || {};

            // Protected - only accessible internal to this 'class'
            // or to 'classes' that inherit from it. So look in
            // the cat 'class' below and you will notice that it
            // can never be called directly, only internal to
            // other methods like 'purr'
            my.clearThroat = function() {
                return 'Ahem';
            };

            // Public methods are attached to 'that'
            that.getName = function() {
                return spec.name;
            };

            // Here's another such public method
            that.says = function() {
                return my.clearThroat() + ' ' + spec.saying || '';
            };

            // Calling var test = mammal() returns the 'that' object
            // and access to its methods. The protected methods hooked
            // up to 'my' are available as closures.
            return that;
        },

        cat: function(spec, my) {
            var that = {};
            my = my || {};
            spec.saying = spec.saying || 'meow';

            // Here's the magic - inheriting from the 'mammal'
            that = mammal(spec, my);

            that.purr = function() {
                return my.clearThroat() + ' purr';
            };

            that.getName = function() {
                return that.says() + ' ' + spec.name + ' ' + that.says();
            };

            return that;
        },

        /**
        * Notice how this doesn't actually return anything explicitly? This
        * Means it returns undefined unless you call it with 'new', which
        * is why it's got a capitalized name.
        * Also, 'this' is scoped to the Story function only.
        * @constructor
        **/
        Story: function(title, content) {
            this.title = title;
            this.content = content;
        },

        /**
        * This uses closure to prevent tampering with prefix or sequence. The methods
        * are available as functions on the anonymous object returned by the 'return'
        * statement. So while set_prefix etc have access to prefix and sequence via
        * closure, the callee cannot see then. Secure!
        * @return {numb} Unique number generator.
        **/
        numb: function() {

            // so these are never visible outside of the generator function
            var prefix = '';
            var sequence = 0;

            return {
                set_prefix: function(p) {
                    prefix = p;
                },
                set_sequence: function(s) {
                    sequence = s;
                },
                next: function() {
                    // yet prefix and sequence can be accessed here. weird but true!
                    var result = prefix + sequence;
                    sequence += 1;
                    return result;
                }
            };
        },

        // Functional 'class'
        // Not great if many instances are needed

        /**
        * Represents a story in a timeline
        * @param {Object} spec Contains start_date, end_date, and title.
        * @param {Object} my Allows inheritence and protected method creation.
        * @return {story} The story.
        */
        story: function(spec, my) {

            // These are private instance variables. 'That' will always
            // be present. The others are up to you
            var that, start_date, end_date, title, body;
            spec = spec || {};
            // 'my' is where shared variables and functions can be attached
            // in an inheritence hierarchy
            my = my || {};

            // Attach privileged methods to 'that'
            that = {};

            that.get_start_date = function() {
                return spec.start_date || Date.now();
            };

            return that;
        }
    };
}();

/**
* Notice how this prototypal method can get to 'this'
* @return {string} A string of the title and body.
**/
FOO.Story.prototype.createBlog = function() {
    return 'Title: ' + this.title + ', Body: ' + this.content;
};
