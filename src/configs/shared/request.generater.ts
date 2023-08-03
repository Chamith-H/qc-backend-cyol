export class RequestGenerater {
  async create_NewRequest(dataModel: any, prefix: string) {
    try {
      const currentReq = await dataModel.aggregate([
        {
          $group: {
            _id: null,
            maxNum: { $max: '$number' },
          },
        },
      ]);

      const newRequestNumber = currentReq[0].maxNum + 1;
      return await this.generate_NewId(newRequestNumber, prefix);
    } catch (error) {
      const newRequestNumber = 1;
      return await this.generate_NewId(newRequestNumber, prefix);
    }
  }

  generate_NewId(reqNumber: number, prefixStr: string) {
    let str_reqNumber = reqNumber.toString();

    if (str_reqNumber.length >= 6) {
      return {
        requestNumber: reqNumber,
        requestId: prefixStr + '-' + str_reqNumber,
      };
    } else {
      let zeroCount = 6 - str_reqNumber.length;
      let setRequestId = '0'.repeat(zeroCount) + str_reqNumber;

      return {
        requestNumber: reqNumber,
        requestId: prefixStr + '-' + setRequestId,
      };
    }
  }
}
