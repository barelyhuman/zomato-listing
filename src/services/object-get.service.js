 export default function (obj, path, def) {
     
	var stringToPath = function (path) {

		if (typeof path !== 'string') return path;

		var output = [];

		path.split('.').forEach(function (item, index) {

			item.split(/\[([^}]+)\]/g).forEach(function (key) {

				if (key.length > 0) {
					output.push(key);
				}

			});

		});

		return output;

	};

	path = stringToPath(path);

	var current = obj;

	for (var i = 0; i < path.length; i++) {

		if (!current[path[i]]) return def;

		current = current[path[i]];

	}

	return current;

};