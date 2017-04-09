var CalculatorModel = function() {
    var self = this;

    // array of  commands
    self.commands = [
        { command: ' + ' },
        { command: ' - ' },
        { command: ' * ' },
        { command: ' / ' },
        { command: 'sin', action: 'Math.sin(__param__)' },
        { command: 'cos', action: 'Math.cos(__param__)' },
    ];

    // array of  numbers
    self.numbers = [
        { val: 1 },
        { val: 2 },
        { val: 3 },
        { val: 4 },
        { val: 5 },
        { val: 6 },
        { val: 7 },
        { val: 8 },
        { val: 9 },
        { val: 0 },
    ];

    // result command line
    self.commandline = ko.observable('');

    // last used command
    self.lastCommand = ko.observable('');

    self.needCleanup = ko.observable(false);

    // add a number function
    self.addNumber = function(e) {
        if (self.needCleanup()) {
            self.commandline('');
            self.needCleanup(false);
        }
        if (this.val == 0 && self.commandline() == '') {
            return;
        }
        self.commandline(self.commandline() + this.val);
    };

    // add a command function
    self.addCommand = function(e) {
        if (e.action && self.commandline()) {
            var newCommand = e.action.replace('__param__', self.commandline());
            self.commandline(eval(newCommand));
            self.needCleanup(true);
        }

        if (self.lastCommand() == '') { // put a command into command line
            if (!e.action) {
                self.commandline(self.commandline() + e.command);
            }
            self.lastCommand(e.command);
        }
    };

    // calculation
    self.doCalculate = function(e) {
        self.commandline(eval(self.commandline()));

        if (self.lastCommand() != '') {
            self.lastCommand('');
        }
        self.needCleanup(true);
    };
    self.hasNumbers = ko.computed(function() {
        return self.commandline() == '';
    }, self);
};

ko.applyBindings(new CalculatorModel());