function StudentName(name) {
    var self = this;
    self.name = name;
}
function ReservationsViewModel() {
    var self = this;
    self.addStudent = function() {
        self.students.push(new StudentName(""));
    }
    self.removeStudent = function(studentlist) { self.students.remove(studentlist) }
    function StudentName(name) {
        var self = this;
        self.name = name;
    }
    self.students = ko.observableArray([
        new StudentName("First Full Name"),
        new StudentName("Second Full Name"),
        new StudentName("Third Full Name"),
        new StudentName("Four Full Name"),
        new StudentName("Five Full Name")
    ]);
}
ko.applyBindings(new ReservationsViewModel());