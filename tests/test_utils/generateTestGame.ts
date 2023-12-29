import type { InferInsertModel } from "drizzle-orm";
import type { games } from "$lib/db/schema/games";

type Game = typeof games.$inferInsert;

function generateLoremIpsum(paragraphs = 3) {
    const loremIpsumText = `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. 
      Phasellus rhoncus, dolor et aliquam faucibus, est elit laoreet ipsum, vel tincidunt nunc tellus ut ligula. Proin at dui turpis, vel consectetur elit. Aenean mattis. 
  
      Morbi eget sapien sed risus suscipit cursus. Quisque iaculis facilisis lacinia. Mauris euismod pellentesque tellus sit amet mollis. Nulla a scelerisque turpis. 
      In eget orci a felis faucibus ornare. Vivamus tincidunt, elit sit amet interdum feugiat, nibh orci aliquam dui, eu congue dolor odio vel enim. 
  
      Nunc a mauris vel metus condimentum tincidunt. Sed ornare congue ante, aliquam tempus sapien mollis a. Duis vitae justo a elit aliquam aliquam. 
      Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    `;

    // Split the text into paragraphs and return the specified number of paragraphs
    const paragraphsArray = loremIpsumText.trim().split('\n\n');
    return paragraphsArray.slice(0, paragraphs).join('\n\n');
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

export default function generateTestGame(): Game {
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

    // Generate a random number between 11 and 99
    const randomNumber = Math.floor(Math.random() * 89) + 11;
    const randomRating = Math.random() * 9 + 1;

    // Combine the adjective, noun, and random number in PascalCase
    const name = `${randomAdjective} ${randomNoun}`;
    const slug = name.replace(/ /g, '-').toLowerCase();

    const playerCount = generateRandomPlayerCount();
    const minYear = 1985;
    const maxYear = new Date().getFullYear(); // Get the current year dynamically
    const releaseYear = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;

    return {
        name,
        slug,
        desc: generateLoremIpsum(),
        averageRating: randomRating.toString(),
        minNumberOfPlayers: playerCount.minPlayers,
        maxNumberOfPlayers: playerCount.maxPlayers,
        yearPublished: releaseYear
    };
}