function isEmptyObject(obj) {
    var name;
    for (name in obj) {
        return false;
    }
    return true;
};

//http://stackoverflow.com/questions/8431651/getting-a-diff-of-two-json-objects
function diff(obj1, obj2) {
    var result = {};
    var change;
    for (var key in obj1) {
        if (typeof obj2[key] == 'object' && typeof obj1[key] == 'object') {
            change = diff(obj1[key], obj2[key]);
            if (isEmptyObject(change) === false) {
                result[key] = change;
            }
        }
        else if (obj2[key] != obj1[key]) {
            result[key] = obj2[key];
        }
    }
    return result;
};

export default diff;
