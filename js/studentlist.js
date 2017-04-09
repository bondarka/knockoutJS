var AppViewModel = function(){

    var sort = this;

    sort.student = ko.observableArray([
        {fullName: 'First Full Name', gender: 'f', age: 56},
        {fullName: 'Second Full Name', gender: 'm', age: 10},
        {fullName: 'Third Full Name', gender: 'm', age: 85},
        {fullName: 'Four Full Name', gender: 'm', age: 26},
        {fullName: 'Five Full Name', gender: 'f', age: 31}
    ]);

    sort.buttonfilter = [
        {title:'All students', filter: null},
        {title:'Mail', filter: function(item){return item.gender === 'm';}},
        {title:'Famail', filter: function(item){return item.gender === 'f';}},
        {title:'More 18', filter: function(item){return item.age >= 18; }},
        {title:'Less 18', filter: function(item){return item.age < 18; }}
    ];

    sort.activeFilter = ko.observable(sort.buttonfilter[0].filter);

    sort.setActiveFilter = function(filterModel,event){
        sort.activeFilter(filterModel.filter);
    };

    sort.filtereStudent = ko.computed(function(){
        var result;
        sort.activeFilter()? result = ko.utils.arrayFilter(sort.student(), sort.activeFilter()):result = sort.student();
        return result.sort(ko.observable(function(){return 0;}));
    });
};

ko.applyBindings(new AppViewModel());