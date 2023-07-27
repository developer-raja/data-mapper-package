# Object Data Mapper

[![npm version](https://badge.fury.io/js/data-mapper.svg)](https://badge.fury.io/js/data-mapper)
[![License](https://img.shields.io/npm/l/data-mapper.svg)](https://github.com/your-username/data-mapper/blob/main/LICENSE)

**Data Mapper** is a powerful npm package that simplifies object data mapping and transformation between different structures and formats in JavaScript. It provides an intuitive way to define property mappings, allowing you to extract and rearrange data from complex nested objects effortlessly. The library supports custom transformation functions to further manipulate data during mapping. Additionally, **Object Data Mapper** comes with flexible error handling options, enabling you to gracefully handle missing or invalid properties based on your specific needs.

## Installation

You can install **Object Data Mapper** using npm:

## Usage

```javascript
const { createDataMapperFactory, mapProperty } = require('object-data-mapper');

// Your property mappings
const propertyMappings = {
	'userData.firstName': mapProperty('userData.firstName', 'profile.firstName'),
	'userData.lastName': mapProperty('userData.lastName', 'profile.lastName'),
	'userData.email': mapProperty('userData.email', 'profile.email'),
	'userData.address.line1': mapProperty(
		'userData.address.line1',
		'profile.address.street'
	),
	'userData.address.city': mapProperty(
		'userData.address.city',
		'profile.address.city'
	),
	'userData.address.postalCode': mapProperty(
		'userData.address.postalCode',
		'profile.address.zipCode'
	),
	'userData.address.country': mapProperty(
		'userData.address.country',
		'profile.address.country'
	),
	'userData.phoneNumbers.primary': mapProperty(
		'userData.phoneNumbers.primary',
		'contact.primary'
	),
	'userData.phoneNumbers.secondary': mapProperty(
		'userData.phoneNumbers.secondary',
		'contact.secondary',
		// Transform value
		(value) => value?.replace(/^\+1/, '')
	),
};

// Create the data mapper factory with default error handling
const defaultErrorMessage = 'Invalid property encountered during data mapping.';
const defaultStatusCode = 400;
const dataMapperFactory = createDataMapperFactory(
	propertyMappings,
	defaultErrorMessage(optional),
	defaultStatusCode(optional)
);

// Your sample data
const userData = {
	firstName: 'John',
	lastName: 'Doe',
	email: 'john.doe@example.com',
	address: {
		line1: '123 Main Street',
		city: 'New York',
		postalCode: '10001',
		country: 'USA',
	},
	phoneNumbers: {
		primary: '+1 123-456-7890',
		secondary: '+1 987-654-3210',
	},
};

// Map the data using the factory
try {
	const result = dataMapperFactory.mapData({
		userData, // Add other data properties if needed
	});
	console.log(result);
} catch (error) {
	console.error(`${error.message} (Status Code: ${error.statusCode})`);
}
```
