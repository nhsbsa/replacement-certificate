function Treatment(name, email) {       // Accept name and age in the constructor
    this.name = name || null;
    this.email  = email  || null;
}

Treatment.prototype.getName = function() {
    return this.name;
}

Treatment.prototype.setName = function(name) {
    this.name = name;
}

Treatment.prototype.getEmail = function() {
    return this.email;
}

Treatment.prototype.set = function(email) {
    this.email = email;
}

Treatment.prototype.fill = function(newFields) {
    for (var field in newFields) {
        if (this.hasOwnProperty(field) && newFields.hasOwnProperty(field)) {
            if (this[field] !== 'undefined') {
                this[field] = newFields[field];
            }
        }
    }
};

module.exports = Treatment;