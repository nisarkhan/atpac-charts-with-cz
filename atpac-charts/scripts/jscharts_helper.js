function randomColorGenerator(num) {
    var result = [];
    for (var i = 0; i < num; i += 1) {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var j = 0; j < 6; j += 1) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        result.push(color);
    }
    return result;
}

function http_path_organizations() {
    return "http://api.issoa.net/api/organizations";
}

function http_path_work_package()
{
    return "http://api.issoa.net/api/workpackages";
}