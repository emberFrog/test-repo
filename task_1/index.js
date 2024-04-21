import { encoded, translations } from './data.js'

function decodeFields(encodedData) {
	return encodedData.map(item => {
		const decodedItem = {}
		for (const key in item) {
			if (key.endsWith('Id')) {
				if (['groupId', 'service', 'formatSize', 'ca'].includes(key)) {
					decodedItem[key] = item[key]
				} else {
					decodedItem[key] = translations[item[key]] || item[key]
				}
			} else {
				decodedItem[key] = item[key]
			}
		}
		return decodedItem
	})
}

function collectUniqueIds(encodedData) {
	const uniqueIds = new Set()
	encodedData.forEach(item => {
		for (const key in item) {
			if (key.endsWith('Id')) {
				uniqueIds.add(item[key])
			}
		}
	})
	return Array.from(uniqueIds)
}

const decodedData = decodeFields(encoded)
const uniqueIdsList = collectUniqueIds(encoded)

console.log('Decoded Data:', decodedData)
console.log('Unique IDs:', uniqueIdsList)

// console.log("Let's rock")
// console.log(encoded, translations)
// console.log(decoded)
