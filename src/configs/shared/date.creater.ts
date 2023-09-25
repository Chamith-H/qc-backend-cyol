export class DateCreater {
  create_newDate() {
    const date = new Date();
    const convertDate = date.toISOString();
    const realDate = convertDate.substring(0, 10);

    return realDate;
  }
}
