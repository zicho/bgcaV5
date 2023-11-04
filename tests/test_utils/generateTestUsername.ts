export default function generateTestUsername(): string {
    const adjectives = [
        "Blue", "Green", "Happy", "Swift", "Furious", "Sunny", "Clever", "Lively",
        "Energetic", "Vibrant", "Joyful", "Radiant", "Graceful", "Brilliant", "Smart",
        "Friendly", "Adventurous", "Caring", "Charming", "Gleeful"
    ];

    const nouns = [
        "Dog", "Cat", "Car", "Sun", "Moon", "Ocean", "Mountain", "River",
        "Rainbow", "Star", "Book", "Music", "Flower", "Coffee", "Computer",
        "Dream", "Journey", "Adventure", "Guitar", "Sailboat"
    ];
    
    // Randomly select an adjective and a noun from their respective arrays
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

    // Generate a random number between 11 and 99
    const randomNumber = Math.floor(Math.random() * 89) + 11;

    // Combine the adjective, noun, and random number in PascalCase
    const username = `TU_${randomAdjective}${randomNoun}${randomNumber}`;

    return username;
}