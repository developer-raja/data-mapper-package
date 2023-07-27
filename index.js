function createDataMapperFactory(
	propertyMappings,
	defaultErrorMessage,
	defaultStatusCode
) {
	function mapData(data, errorHandler) {
		const result = {};

		for (const [key, value] of Object.entries(propertyMappings)) {
			const { source, target, transform } = value;
			const sourceValue = getSourceValue(source, data);

			if (typeof sourceValue !== 'undefined') {
				if (typeof transform === 'function') {
					assignNestedProperty(result, target, transform(sourceValue));
				} else {
					assignNestedProperty(result, target, sourceValue);
				}
			} else {
				const errorMessage = errorHandler
					? defaultErrorMessage
					: 'Invalid property encountered during data mapping.';
				const statusCode = errorHandler ? defaultStatusCode : 400;

				if (typeof errorHandler === 'function') {
					errorHandler(errorMessage, statusCode);
				} else {
					const error = new Error(errorMessage);
					error.statusCode = statusCode;
					throw error;
				}
			}
		}
		return result;
	}

	function assignNestedProperty(obj, keyPath, value) {
		const keys = keyPath.split('.');
		let nestedObj = obj;

		for (let i = 0; i < keys.length - 1; i++) {
			const key = keys[i];

			if (typeof nestedObj[key] !== 'object' || nestedObj[key] === null) {
				nestedObj[key] = {};
			}

			nestedObj = nestedObj[key];
		}

		const lastKey = keys[keys.length - 1];
		nestedObj[lastKey] = value;
	}

	function getSourceValue(source, data) {
		if (typeof source === 'function') {
			return source();
		}
		const keys = source.split('.');
		let value = data;

		for (const key of keys) {
			if (typeof value !== 'undefined' && value !== null) {
				value = value[key];
			} else {
				value = undefined;
				break;
			}
		}
		return value;
	}
	return { mapData };
}

function mapProperty(source, target, transform) {
	return { source, target, transform };
}

module.exports = { mapProperty, createDataMapperFactory };
