import type { games } from "$lib/db/schema/games";

type Game = typeof games.$inferInsert;

function generateDesc(paragraphs = 3) {
    const adjectives = [
        "exciting", "epic", "thrilling", "mysterious", "challenging", "fantastic",
        "enchanting", "magical", "adventurous", "intriguing", "daring", "spectacular"
    ];

    const themes = [
        "medieval", "space", "fantasy", "mystery", "cyberpunk", "historic",
        "adventure", "horror", "sci-fi", "detective", "wild west", "post-apocalyptic"
    ];

    const genres = [
        "strategy", "role-playing", "adventure", "simulation", "puzzle", "action",
        "card", "board", "party", "sports", "racing", "fighting"
    ];

    const intros = [
        "Immerse yourself",
        "Get lost",
        "Hone your skills",
        "Betray your friends",
        "Conquer your enemies",
    ];

    const getRandomItem = (array: string | any[]) => array[Math.floor(Math.random() * array.length)];

    const sentenceStructures = [
        '{intro} in the {adjective} world of {theme} as you experience a {genre} game.',
        'Embark on a {adjective} journey in a {theme} setting, playing a captivating {genre} game.',
        'Explore the {adjective} landscapes of a {theme} world in this thrilling {genre} adventure.',
        'Step into the {adjective} realm of {theme} and engage in an exciting {genre} experience.'
    ];

    const getRandomSentence = () => {
        const sentenceTemplate = getRandomItem(sentenceStructures);
        return sentenceTemplate
            .replace('{intro}', getRandomItem(intros))
            .replace('{adjective}', getRandomItem(adjectives))
            .replace('{theme}', getRandomItem(themes))
            .replace('{genre}', getRandomItem(genres));
    };

    const descriptionLength = Math.floor(Math.random() * 3) + 2; // Varying length (2 to 4 sentences)
    const description = Array.from({ length: descriptionLength }, getRandomSentence).join(' ');

    return description.trim();
}

function generateRandomPlayerCount() {
    const maxPlayers = 9;
    let minPlayers = Math.floor(Math.random() * maxPlayers) + 1; // Ensure minPlayers is never zero
    const maxPlayersInRange = Math.floor(Math.random() * (maxPlayers - minPlayers + 1)) + minPlayers;

    return {
        minPlayers: minPlayers,
        maxPlayers: maxPlayersInRange
    };
}

export default function generateTestGame({ providedTitle }: { providedTitle?: string } = {}): Game {
    const adjectives = [
        "Epic", "Mythic", "Legendary", "Valor", "Infinite", "Galactic", "Quantum",
        "Enchanted", "Cosmic", "Chaotic", "Majestic", "Supreme", "Turbo", "Rogue",
        "Stealthy", "Eternal", "Celestial", "Tactical", "Arcane", "Immortal"
    ];

    const nouns = [
        "Blade", "Rune", "Nexus", "Odyssey", "Legacy", "Havoc", "Vanguard", "Phoenix",
        "Citadel", "Apex", "Mirage", "Specter", "Genesis", "Titan", "Vanguard", "Zenith",
        "Quest", "Cipher", "Paragon", "Arbiter"
    ];

    // Randomly select an adjective and a noun from their respective arrays
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

    const randomRating = (Math.random() * 9 + 1).toFixed(1);

    // Combine the adjective, noun, and random number in PascalCase
    const generatedTitle = `${randomAdjective} ${randomNoun}`;
    const slug = generatedTitle.replace(/ /g, '-').toLowerCase();

    const playerCount = generateRandomPlayerCount();
    const minYear = 1985;
    const maxYear = new Date().getFullYear(); // Get the current year dynamically
    const releaseYear = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;

    return {
        name: providedTitle || generatedTitle,
        slug,
        description: generateDesc(),
        averageRating: randomRating.toString(),
        minPlayers: playerCount.minPlayers,
        maxPlayers: playerCount.maxPlayers,
        yearPublished: releaseYear
    };
}