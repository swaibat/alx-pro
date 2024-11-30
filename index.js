function wordFrequency(text, n) {
  // Split text into words, removing punctuation and converting to lowercase
  const words = text.toLowerCase().match(/\b\w+\b/g)

  // Count the occurrences of each word
  const wordCounts = {}
  words.forEach(word => {
    wordCounts[word] = (wordCounts[word] || 0) + 1
  })

  // Convert the word counts object into an array of [word, count]
  const pairs = Object.entries(wordCounts)

  // Sort the pairs array by count in descending order
  pairs.sort((a, b) => b[1] - a[1])

  // Get the top n frequent words
  const topFrequent = pairs.slice(0, n).map(([word, count]) => {
    return { word, count }
  })

  return topFrequent
}

// Example usage
const text = 'Lorem ipsum sit dolor amet, consectetur lorem ipsum lorem ipsum.'
const n = 3
console.log(wordFrequency(text, n))
