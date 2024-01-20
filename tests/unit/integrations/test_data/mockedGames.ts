import type { BggGameSimple } from "$lib/server/integrations/dto/BggGameSimple";

const mockedGames: BggGameSimple[] = [
    {
        gameId: 1, // known as bggId in our db
        name: "The best game",
        image: "imageUrl",
        thumbnail: "thumbnailUrl",
        minPlayers: 1,
        maxPlayers: 5,
        playingTime: 90,
        isExpansion: false,
        yearPublished: 1945,
        averageRating: "7.2",
    },
    {
        gameId: 2, // known as bggId in our db
        name: "The best game",
        image: "imageUrl",
        thumbnail: "thumbnailUrl",
        minPlayers: 1,
        maxPlayers: 5,
        playingTime: 90,
        isExpansion: false,
        yearPublished: 1945,
        averageRating: "7.2",
    },
    {
        gameId: 3, // known as bggId in our db
        name: "The best game",
        image: "imageUrl",
        thumbnail: "thumbnailUrl",
        minPlayers: 1,
        maxPlayers: 5,
        playingTime: 90,
        isExpansion: false,
        yearPublished: 1945,
        averageRating: "7.2",
    }
]

export default mockedGames;
