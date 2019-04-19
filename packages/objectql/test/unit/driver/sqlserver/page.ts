// import { SteedosSchema, SteedosSqlServerDriver, SteedosQueryOptions, SteedosDatabaseDriverType } from '../../../../src';
// import { expect } from 'chai';

// let url = process.env.DRIVER_SQLSERVER_URL;//不提供url值时不运行单元测试
// let tableName = "TestPageForSqlserver";
// let driver: SteedosSqlServerDriver;

// describe.only('fetch records by paging for sqlserver database', () => {
//     try {
//         require("mssql");
//     }
//     catch (ex) {
//         return true;
//     }
//     let result: any;
//     let expected: any;
//     let testIndex: number = 0;

//     let tests = [
//         {
//             title: "top",
//             options: {
//                 fields: ["name"],
//                 top: 2
//             },
//             expected: {
//                 length: 2
//             }
//         },
//         {
//             title: "skip",
//             options: {
//                 fields: ["id", "name"],
//                 sort: 'index',
//                 skip: 2
//             },
//             expected: {
//                 error: 'top must not be empty for skip'
//             }
//         },
//         {
//             title: "top and skip for paging",
//             options: {
//                 fields: ["id", "name"],
//                 sort: 'index',
//                 top: 2,
//                 skip: 3
//             },
//             expected: {
//                 length: 1,
//                 firstRecordId: "ptr2"
//             }
//         }
//     ];

//     before(async () => {
//         let mySchema = new SteedosSchema({
//             datasources: {
//                 default: {
//                     url: url,
//                     driver: SteedosDatabaseDriverType.SqlServer,
//                     objects: {
//                         test: {
//                             label: 'SqlServer Schema',
//                             tableName: tableName,
//                             fields: {
//                                 id: {
//                                     label: '主键',
//                                     type: 'text',
//                                     primary: true
//                                 },
//                                 name: {
//                                     label: '名称',
//                                     type: 'text'
//                                 },
//                                 title: {
//                                     label: '标题',
//                                     type: 'text'
//                                 },
//                                 index: {
//                                     label: '序号',
//                                     type: 'number'
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         });
//         const datasource = mySchema.getDataSource("default");
//         await datasource.createTables();
//         driver = <SteedosSqlServerDriver>datasource.adapter;
//     });

//     beforeEach(async () => {
//         await driver.insert(tableName, { id: "cnpc1", name: "cnpc", title: "CNPC", index: 1 });
//         await driver.insert(tableName, { id: "cnpc2", name: "cnpc", title: "CNPC", index: 2 });
//         await driver.insert(tableName, { id: "ptr1", name: "ptr", title: "PTR", index: 3 });
//         await driver.insert(tableName, { id: "ptr2", name: "ptr", title: "PTR", index: 4 });

//         let queryOptions: SteedosQueryOptions = tests[testIndex].options;
//         expected = tests[testIndex].expected;
//         try {
//             result = await driver.find(tableName, queryOptions);
//         }
//         catch(ex){
//             result = ex;
//         }
//     });

//     afterEach(async () => {
//         await driver.delete(tableName, "cnpc1");
//         await driver.delete(tableName, "cnpc2");
//         await driver.delete(tableName, "ptr1");
//         await driver.delete(tableName, "ptr2");
//     });

//     tests.forEach(async (test) => {
//         it(`${test.title}`, async () => {
//             testIndex++;
//             if (expected.error !== undefined) {
//                 expect(result.message).to.be.eq(expected.error);
//             }
//             if (expected.length !== undefined){
//                 expect(result).to.be.length(expected.length);
//             }
//             if (expected.firstRecordId !== undefined) {
//                 expect(result[0].id).to.be.eq(expected.firstRecordId);
//             }
//         });
//     });
// });
