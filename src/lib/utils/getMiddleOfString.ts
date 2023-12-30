export default function getMiddleOfString(inputString: string): string {
    const length = inputString.length;

    // Calculate the approximate one-third index
    const oneThirdIndex = Math.floor(length / 3);
  
    // Set the start and end indices for the substring
    const startIndex = oneThirdIndex;
    const endIndex = oneThirdIndex * 2 + 1;
  
    // Extract the middle content using substring
    const middleContent = inputString.substring(startIndex, endIndex);
  
    return middleContent;
}