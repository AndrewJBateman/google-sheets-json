// function to get data from google sheet and convert to a JSON object array.
// It is necessary to add the xls header to every row of data

function doGet(e) {
  const id = "YOUR GOOGLE SHEETS ID HERE";
  const spreadSheet = SpreadsheetApp.openById(id);
  const sheet = spreadSheet.getSheetByName("data");
  const rows = sheet.getDataRange().getValues();
  const headers = rows[0];
  const userData = rows.slice(1);
  const userArray = [];
  userData.forEach((element, ind) => {
    const temp = {
      row: ind + 2,
    };
    headers.forEach((header, index) => {
      temp[header.toLowerCase()] = element[index];
    });
    userArray.push(temp);
  });

  const output = JSON.stringify({
    status: true,
    data: userArray,
  });

  return ContentService.createTextOutput(output).setMimeType(
    ContentService.MimeType.JSON
  );
}
