export const addNewTabToLinks = (htmlString) => {
  // Create a temporary div to parse the HTML string
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;

  // Find all anchor tags
  const links = tempDiv.getElementsByTagName('a');

  // Modify each link to open in a new tab
  Array.from(links).forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });

  // Return the modified HTML string
  return tempDiv.innerHTML;
};