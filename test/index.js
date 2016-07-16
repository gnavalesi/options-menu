var menu = require('../lib/menu');
var assert = require('assert');
var fs = require('fs');
var _ = require('underscore');

describe('single', function() {
    it('should show a menu and allow to choose a valid option', function(done) {
        var output = '';
        var oldWrite = process.stdout.write;

        process.stdout.write = function(data) {
            output += data.toString();
        };

        var title = 'title';
        var options = _.map(_.range(3), function(i) {
            return {
                title: 'option' + i,
                action: function() {
                    console.log(i);
                }
            }
        });

        var expected = _.reduce(options, function(acc, opt, i) {
            return acc + (i + 1) + ') ' + opt.title + '\n';
        }, title + ':\n') + '0\n';

        menu.single('title', options, function() {
            process.stdout.write = oldWrite;

            assert.equal(output, expected);

            done();
        });

        process.stdin.emit('data', '1');
    });

    it('should show a menu and not allow to choose an invalid option', function(done) {
        var output = '';
        var oldWrite = process.stdout.write;

        process.stdout.write = function(data) {
            output += data.toString();
        };

        var title = 'title';
        var options = _.map(_.range(3), function(i) {
            return {
                title: 'option' + i,
                action: function() {
                    console.log(i);
                }
            }
        });

        var expected = _.reduce(options, function(acc, opt, i) {
                return acc + (i + 1) + ') ' + opt.title + '\n';
            }, title + ':\n') + 'Invalid option\nInvalid option\nInvalid option\n0\n';

        menu.single('title', options, function() {
            process.stdout.write = oldWrite;

            assert.equal(output, expected);

            done();
        });

        process.stdin.emit('data', '0');
        process.stdin.emit('data', '4');
        process.stdin.emit('data', 'a');
        process.stdin.emit('data', '1');
    });
});

describe('multi', function() {
    it('should show a menu and allow to choose many valid options', function(done) {
        var output = '';
        var oldWrite = process.stdout.write;

        process.stdout.write = function(data) {
            output += data.toString();
        };

        var title = 'title';
        var options = _.map(_.range(3), function(i) {
            return {
                title: 'option' + i,
                action: function() {
                    console.log(i);
                }
            }
        });

        var expected = _.reduce(options, function(acc, opt, i) {
                return acc + (i + 1) + ') ' + opt.title + '\n';
            }, title + ':\n') + '0\n1\n2\n';

        menu.multi('title', options, function() {
            process.stdout.write = oldWrite;

            assert.equal(output, expected);

            done();
        });

        process.stdin.emit('data', '1 2 3');
    });

    it('should show a menu and not allow to choose an invalid option', function(done) {
        var output = '';
        var oldWrite = process.stdout.write;

        process.stdout.write = function(data) {
            output += data.toString();
        };

        var title = 'title';
        var options = _.map(_.range(3), function(i) {
            return {
                title: 'option' + i,
                action: function() {
                    console.log(i);
                }
            }
        });

        var expected = _.reduce(options, function(acc, opt, i) {
                return acc + (i + 1) + ') ' + opt.title + '\n';
            }, title + ':\n') + 'Invalid option\nInvalid option\nInvalid option\n0\n1\n2\n';

        menu.multi('title', options, function() {
            process.stdout.write = oldWrite;

            assert.equal(output, expected);

            done();
        });

        process.stdin.emit('data', '0');
        process.stdin.emit('data', '4');
        process.stdin.emit('data', 'a 2');
        process.stdin.emit('data', '1 2 3');
    });
});
/*


var ClientSideApp = function () {
    var options = menu.build(menu.multi, 'Yeahhhh!!!!!', [{
        title: 'Title 1',
        action: function () {
            console.log('fuck1');
        }
    }, {
        title: 'Title 2',
        action: function () {
            console.log('fuck2');
        }
    }, {
        title: 'Title 3',
        action: function () {
            console.log('fuck3');
        }
    }]);

    options();
};*/

/** Menu **//*
function opcion2() {
    console.log('opcion2');
    process.exit();
}

function opcion3() {
    console.log('opcion3');
    process.exit();
}

var mainMenu = function () {
    menu.single('Application type', [{
        title: 'Client-side application with AngularJS and Bootstrap',
        action: ClientSideApp
    }, {
        title: 'Alguna otra',
        action: opcion2
    }, {
        title: 'Alguna mas',
        action: opcion3
    }]);
};


mainMenu();
*/