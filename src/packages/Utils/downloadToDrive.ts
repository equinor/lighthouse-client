/**
 * Function to download a file to the drive.
 * Adds an anchor tag and emulates a click event with the download attribute.
 */
export const downloadToDrive = (url: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = url;

    link.setAttribute('download', fileName);
    link.style.display = 'none';
    link.click();

    link.remove();
};
